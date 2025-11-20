package com.fullstack2.backend.repository;

import com.fullstack2.backend.entity.Campaign;
import com.fullstack2.backend.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Long> {

    List<Shop> findByCampaign(Campaign campaign);
}
