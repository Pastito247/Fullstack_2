package com.fullstack2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "campaigns")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000)
    private String description;

    // Código que puedes mostrar al jugador para que se una
    @Column(unique = true)
    private String inviteCode;

    // DM dueño de la campaña
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dm_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User dm;

    // Jugadores que se unieron a la campaña
    @ManyToMany
    @JoinTable(
            name = "campaign_players",
            joinColumns = @JoinColumn(name = "campaign_id"),
            inverseJoinColumns = @JoinColumn(name = "player_id")
    )
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<User> players = new ArrayList<>();

    // Personajes de la campaña (PJ + NPC)
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<CharacterEntity> characters = new ArrayList<>();
}
