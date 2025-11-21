package com.fullstack2.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shops")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    @JsonIgnore
    private Campaign campaign;
}
