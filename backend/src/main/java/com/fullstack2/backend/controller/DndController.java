package com.fullstack2.backend.controller;

import com.fullstack2.backend.service.Dnd5eClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/dnd")
@CrossOrigin(origins = "*")
public class DndController {

    private final Dnd5eClient dnd5eClient;

    public DndController(Dnd5eClient dnd5eClient) {
        this.dnd5eClient = dnd5eClient;
    }

    // ====== Equipment ======

    // Lista de equipment (ResourceList: count + results[])
    // GET /api/dnd/equipment
    @GetMapping("/equipment")
    public ResponseEntity<Map<String, Object>> listEquipment() {
        return ResponseEntity.ok(dnd5eClient.getEquipmentList());
    }

    // Detalle de un equipment por index
    // GET /api/dnd/equipment/{index}
    @GetMapping("/equipment/{index}")
    public ResponseEntity<Map<String, Object>> getEquipment(@PathVariable String index) {
        return ResponseEntity.ok(dnd5eClient.getEquipmentByIndex(index));
    }

    // ====== Magic Items ======

    @GetMapping("/magic-items")
    public ResponseEntity<Map<String, Object>> listMagicItems() {
        return ResponseEntity.ok(dnd5eClient.getMagicItemsList());
    }

    @GetMapping("/magic-items/{index}")
    public ResponseEntity<Map<String, Object>> getMagicItem(@PathVariable String index) {
        return ResponseEntity.ok(dnd5eClient.getMagicItemByIndex(index));
    }

    // ====== Spells (por si los quieres usar luego) ======

    @GetMapping("/spells")
    public ResponseEntity<Map<String, Object>> listSpells() {
        return ResponseEntity.ok(dnd5eClient.getSpellsList());
    }

    @GetMapping("/spells/{index}")
    public ResponseEntity<Map<String, Object>> getSpell(@PathVariable String index) {
        return ResponseEntity.ok(dnd5eClient.getSpellByIndex(index));
    }

    // ====== Monsters (opcional) ======

    @GetMapping("/monsters")
    public ResponseEntity<Map<String, Object>> listMonsters() {
        return ResponseEntity.ok(dnd5eClient.getMonstersList());
    }

    @GetMapping("/monsters/{index}")
    public ResponseEntity<Map<String, Object>> getMonster(@PathVariable String index) {
        return ResponseEntity.ok(dnd5eClient.getMonsterByIndex(index));
    }
}
