package com.fullstack2.backend.dto;

import lombok.Data;

@Data
public class CharacterCreateRequest {

    private String name;
    private String dndClass;
    private String race;
    private Integer level;
    private boolean npc;

    // Opcional: si el DM quiere asignar directo a un jugador por username
    private String playerUsername;
}
