package com.fullstack2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nombre del ítem
    private String name;

    // Fuente: OFFICIAL (DnD5e API) o CUSTOM (creado por el DM)
    @Enumerated(EnumType.STRING)
    private ItemSource source;

    // Tipo genérico: weapon, armor, gear, etc.
    private String type;

    // Categoría de equipo según la API: "Weapon", "Armor", "Adventuring Gear", etc.
    private String equipmentCategory;

    // Categoría de arma: "Simple", "Martial", etc. (weapon_category)
    private String weaponCategory;

    // Tipo de arma: "Melee", "Ranged", "Melee or Ranged" (weapon_range)
    private String weaponRange;

    // Daño en dados: "1d8", "2d6", etc.
    private String damageDice;

    // Tipo de daño: "Slashing", "Bludgeoning", etc.
    private String damageType;

    // Rango normal (en pies)
    private Integer rangeNormal;

    // Rango largo (en pies)
    private Integer rangeLong;

    // Propiedades: "Finesse, Light, Versatile"
    @Column(length = 500)
    private String properties;

    // Precio base en piezas de oro (convertido desde gp/sp/cp)
    private Integer basePriceGold;

    // Rareza (por ahora puedes dejarlo null o usar algo custom)
    private String rarity;

    @Column(length = 2000)
    private String description;

    // Index oficial en la API DnD5e (ejemplo: "longsword")
    private String dnd5eIndex;

    // URL de imagen opcional para el front
    private String imageUrl;

    // 🔥 NUEVO: usuario que creó este ítem (normalmente el DM)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User createdBy;
}
