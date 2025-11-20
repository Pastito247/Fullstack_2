package com.fullstack2.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class Dnd5eClient {

    // Base según la documentación oficial
    private static final String BASE_URL = "https://www.dnd5eapi.co";
    private static final String API_PREFIX = "/api/2014";

    private final RestTemplate restTemplate;

    public Dnd5eClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // ==== Helpers genéricos ====

    // Lista de recursos para un endpoint (equipment, magic-items, spells, etc).
    public Map<String, Object> getResourceList(String endpoint) {
        String url = BASE_URL + API_PREFIX + "/" + endpoint;
        return restTemplate.getForObject(url, Map.class);
    }

    // Un recurso específico por endpoint + index
    public Map<String, Object> getResourceByIndex(String endpoint, String index) {
        String url = BASE_URL + API_PREFIX + "/" + endpoint + "/" + index;
        return restTemplate.getForObject(url, Map.class);
    }

    // ==== Atajos concretos que nos interesan para tu app ====

    // EQUIPMENT
    public Map<String, Object> getEquipmentList() {
        return getResourceList("equipment");
    }

    public Map<String, Object> getEquipmentByIndex(String index) {
        return getResourceByIndex("equipment", index);
    }

    // MAGIC ITEMS
    public Map<String, Object> getMagicItemsList() {
        return getResourceList("magic-items");
    }

    public Map<String, Object> getMagicItemByIndex(String index) {
        return getResourceByIndex("magic-items", index);
    }

    // SPELLS (por si después quieres usarlos para algo)
    public Map<String, Object> getSpellsList() {
        return getResourceList("spells");
    }

    public Map<String, Object> getSpellByIndex(String index) {
        return getResourceByIndex("spells", index);
    }

    // MONSTERS (por si te animas a meter bestiario)
    public Map<String, Object> getMonstersList() {
        return getResourceList("monsters");
    }

    public Map<String, Object> getMonsterByIndex(String index) {
        return getResourceByIndex("monsters", index);
    }
}
