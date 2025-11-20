package com.fullstack2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CharacterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre del personaje
    private String name;

    // Clase: Paladin, Wizard, etc.
    private String dndClass;

    // Raza: Dragonborn, Human, Elf...
    private String race;

    private Integer level;

    // true = NPC, false = PJ
    private boolean npc;

    // Campaña a la que pertenece
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Campaign campaign;

    // Jugador asignado (puede ser null si es NPC o aún no asignado)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User player;
}
