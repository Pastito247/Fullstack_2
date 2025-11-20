package com.fullstack2.backend.service;

import com.fullstack2.backend.dto.ShopRequest;
import com.fullstack2.backend.entity.Campaign;
import com.fullstack2.backend.entity.Shop;
import com.fullstack2.backend.repository.CampaignRepository;
import com.fullstack2.backend.repository.ShopRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final CampaignRepository campaignRepository;

    public ShopService(ShopRepository shopRepository, CampaignRepository campaignRepository) {
        this.shopRepository = shopRepository;
        this.campaignRepository = campaignRepository;
    }

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    public Shop getShopById(Long id) {
        return shopRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tienda no encontrada"));
    }

    public List<Shop> getShopsByCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaña no encontrada"));
        return shopRepository.findByCampaign(campaign);
    }

    public Shop createShop(ShopRequest request) {
        Campaign campaign = campaignRepository.findById(request.getCampaignId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaña no encontrada"));

        Shop shop = Shop.builder()
                .name(request.getName())
                .campaign(campaign)
                .build();

        return shopRepository.save(shop);
    }

    public Shop updateShop(Long id, ShopRequest request) {
        Shop existing = getShopById(id);

        existing.setName(request.getName());

        if (request.getCampaignId() != null) {
            Campaign campaign = campaignRepository.findById(request.getCampaignId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaña no encontrada"));
            existing.setCampaign(campaign);
        }

        return shopRepository.save(existing);
    }

    public void deleteShop(Long id) {
        Shop existing = getShopById(id);
        shopRepository.delete(existing);
    }
}
