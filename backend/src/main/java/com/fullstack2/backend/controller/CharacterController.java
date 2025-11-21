package com.fullstack2.backend.controller;

import com.fullstack2.backend.dto.CharacterCreateRequest;
import com.fullstack2.backend.dto.CharacterResponse;
import com.fullstack2.backend.entity.CharacterEntity;
import com.fullstack2.backend.service.CharacterService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1") // 👈 prefijo común para la versión de la API
public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    // === Mapper interno para no repetir código ===
    private CharacterResponse mapToResponse(CharacterEntity ch) {
        return CharacterResponse.builder()
                .id(ch.getId())
                .name(ch.getName())
                .dndClass(ch.getDndClass())
                .race(ch.getRace())
                .level(ch.getLevel())
                .npc(ch.isNpc())
                .campaignId(ch.getCampaign().getId())
                .campaignName(ch.getCampaign().getName())
                .playerUsername(ch.getPlayer() != null ? ch.getPlayer().getUsername() : null)
                .build();
    }

    // Crear personaje en campaña: POST /api/v1/campaigns/{campaignId}/characters
    @PreAuthorize("hasRole('DM') or hasRole('ADMIN')")
    @PostMapping("/campaigns/{campaignId}/characters")
    public ResponseEntity<CharacterResponse> createCharacter(
            @PathVariable Long campaignId,
            @RequestBody CharacterCreateRequest request) {

        CharacterEntity ch = characterService.createCharacter(campaignId, request);
        return ResponseEntity.ok(mapToResponse(ch));
    }

    // Listar personajes de una campaña: GET /api/v1/campaigns/{campaignId}/characters
    @GetMapping("/campaigns/{campaignId}/characters")
    public ResponseEntity<List<CharacterResponse>> listByCampaign(@PathVariable Long campaignId) {
        List<CharacterResponse> list = characterService.listCharactersByCampaign(campaignId)
                .stream()
                .map(this::mapToResponse)
                .toList();

        return ResponseEntity.ok(list);
    }

    // Asignar personaje a un jugador: POST /api/v1/characters/{characterId}/assign/{username}
    @PostMapping("/characters/{characterId}/assign/{username}")
    public ResponseEntity<CharacterResponse> assignCharacter(
            @PathVariable Long characterId,
            @PathVariable String username) {

        CharacterEntity ch = characterService.assignCharacterToPlayer(characterId, username);
        return ResponseEntity.ok(mapToResponse(ch));
    }

    // Obtener personajes del jugador autenticado: GET /api/v1/characters/my
    @PreAuthorize("hasRole('PLAYER')")
    @GetMapping("/characters/my")
    public ResponseEntity<List<CharacterResponse>> getMyCharacters() {
        // characterService.getCharactersOfCurrentPlayer() debe devolver List<CharacterEntity>
        List<CharacterResponse> list = characterService.getCharactersOfCurrentPlayer()
                .stream()
                .map(this::mapToResponse)
                .toList();

        return ResponseEntity.ok(list);
    }
}
