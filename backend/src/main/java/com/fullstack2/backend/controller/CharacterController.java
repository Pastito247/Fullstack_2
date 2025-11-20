package com.fullstack2.backend.controller;

import com.fullstack2.backend.dto.CharacterCreateRequest;
import com.fullstack2.backend.dto.CharacterResponse;
import com.fullstack2.backend.entity.CharacterEntity;
import com.fullstack2.backend.service.CharacterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    // Crear personaje en campaña: /api/campaigns/{campaignId}/characters
    @PostMapping("/api/campaigns/{campaignId}/characters")
    public ResponseEntity<CharacterResponse> createCharacter(
            @PathVariable Long campaignId,
            @RequestBody CharacterCreateRequest request) {

        CharacterEntity ch = characterService.createCharacter(campaignId, request);

        CharacterResponse response = CharacterResponse.builder()
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

        return ResponseEntity.ok(response);
    }

    // Listar personajes de una campaña
    @GetMapping("/api/campaigns/{campaignId}/characters")
    public ResponseEntity<List<CharacterResponse>> listByCampaign(@PathVariable Long campaignId) {
        List<CharacterResponse> list = characterService.listCharactersByCampaign(campaignId)
                .stream()
                .map(ch -> CharacterResponse.builder()
                        .id(ch.getId())
                        .name(ch.getName())
                        .dndClass(ch.getDndClass())
                        .race(ch.getRace())
                        .level(ch.getLevel())
                        .npc(ch.isNpc())
                        .campaignId(ch.getCampaign().getId())
                        .campaignName(ch.getCampaign().getName())
                        .playerUsername(ch.getPlayer() != null ? ch.getPlayer().getUsername() : null)
                        .build()
                )
                .toList();

        return ResponseEntity.ok(list);
    }

    // Asignar personaje a un jugador
    @PostMapping("/api/characters/{characterId}/assign/{username}")
    public ResponseEntity<CharacterResponse> assignCharacter(
            @PathVariable Long characterId,
            @PathVariable String username) {

        CharacterEntity ch = characterService.assignCharacterToPlayer(characterId, username);

        CharacterResponse response = CharacterResponse.builder()
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

        return ResponseEntity.ok(response);
    }
}
