package com.fullstack2.backend.repository;

import com.fullstack2.backend.entity.Campaign;
import com.fullstack2.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    List<Campaign> findByDm(User dm);

    Optional<Campaign> findByInviteCode(String inviteCode);
}
