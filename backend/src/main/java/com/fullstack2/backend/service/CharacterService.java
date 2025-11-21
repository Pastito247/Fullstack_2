package com.fullstack2.backend.service;

import com.fullstack2.backend.dto.CharacterCreateRequest;
import com.fullstack2.backend.entity.Campaign;
import com.fullstack2.backend.entity.CharacterEntity;
import com.fullstack2.backend.entity.User;
import com.fullstack2.backend.repository.CampaignRepository;
import com.fullstack2.backend.repository.CharacterRepository;
import com.fullstack2.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    public CharacterService(CharacterRepository characterRepository,
            CampaignRepository campaignRepository,
            UserRepository userRepository) {
        this.characterRepository = characterRepository;
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName(); // aquí viene el email desde el JWT

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + email));
    }

    // Crear personaje dentro de una campaña (solo DM de la campaña)
    public CharacterEntity createCharacter(Long campaignId, CharacterCreateRequest request) {
        User current = getCurrentUser();

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaña no encontrada"));

        if (!campaign.getDm().getId().equals(current.getId())) {
            throw new RuntimeException("Solo el DM de la campaña puede crear personajes");
        }

        User assignedPlayer = null;
        if (request.getPlayerUsername() != null && !request.getPlayerUsername().isBlank()) {
            assignedPlayer = userRepository.findByUsername(request.getPlayerUsername())
                    .orElseThrow(() -> new RuntimeException("Jugador no encontrado: " + request.getPlayerUsername()));

            // Si el jugador no está aún en la campaña, lo agregamos
            if (!campaign.getPlayers().contains(assignedPlayer)) {
                campaign.getPlayers().add(assignedPlayer);
                campaignRepository.save(campaign);
            }
        }

        CharacterEntity character = CharacterEntity.builder()
                .name(request.getName())
                .dndClass(request.getDndClass())
                .race(request.getRace())
                .level(request.getLevel())
                .npc(request.isNpc())
                .campaign(campaign)
                .player(assignedPlayer)
                .build();

        return characterRepository.save(character);
    }

    public List<CharacterEntity> listCharactersByCampaign(Long campaignId) {
        User current = getCurrentUser();

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaña no encontrada"));

        boolean isDm = campaign.getDm().getId().equals(current.getId());
        boolean isPlayerInCampaign = campaign.getPlayers().contains(current);

        if (!isDm && !isPlayerInCampaign) {
            throw new RuntimeException("No tienes acceso a los personajes de esta campaña");
        }

        return characterRepository.findByCampaign(campaign);
    }

    // Asignar personaje a jugador (solo DM de la campaña)
    public CharacterEntity assignCharacterToPlayer(Long characterId, String playerUsername) {
        User current = getCurrentUser();

        CharacterEntity character = characterRepository.findById(characterId)
                .orElseThrow(() -> new RuntimeException("Personaje no encontrado"));

        Campaign campaign = character.getCampaign();

        if (!campaign.getDm().getId().equals(current.getId())) {
            throw new RuntimeException("Solo el DM de la campaña puede asignar personajes");
        }

        User player = userRepository.findByUsername(playerUsername)
                .orElseThrow(() -> new RuntimeException("Jugador no encontrado: " + playerUsername));

        if (!campaign.getPlayers().contains(player)) {
            campaign.getPlayers().add(player);
            campaignRepository.save(campaign);
        }

        character.setPlayer(player);
        return characterRepository.save(character);
    }

    // 🔹 Listar personajes del jugador actualmente autenticado
    public List<CharacterEntity> getCharactersOfCurrentPlayer() {
        User current = getCurrentUser();
        return characterRepository.findByPlayer(current);
    }

}
