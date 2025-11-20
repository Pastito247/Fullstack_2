package com.fullstack2.backend.repository;

import com.fullstack2.backend.entity.Campaign;
import com.fullstack2.backend.entity.CharacterEntity;
import com.fullstack2.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<CharacterEntity, Long> {

    List<CharacterEntity> findByCampaign(Campaign campaign);

    List<CharacterEntity> findByPlayer(User player);
}
