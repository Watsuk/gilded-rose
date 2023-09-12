import { GildedRose, ConjuredItem, AgedItem, EventItem, LegendaryItem, NormalItem } from "../src/index";

// Tests spécifiques pour index.ts
describe("Tests pour index.ts", () => {
    it("Aged Brie devrait augmenter en qualité", () => {
        const items = [new AgedItem("Aged Brie", 2, 0)];
        const gildedRose = new GildedRose(items);
        const result = gildedRose.updateQuality();
        console.log("Résultat pour Aged Brie:", result[0]);
        expect(result[0].quality).toBeGreaterThan(0);
    });

    it("Sulfuras, Hand of Ragnaros ne doit pas changer", () => {
        const items = [new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80)];
        const gildedRose = new GildedRose(items);
        const result = gildedRose.updateQuality();
        console.log("Résultat pour Sulfuras:", result[0]);
        expect(result[0].quality).toBe(80);
        expect(result[0].sellIn).toBe(0);
    });

    it("Conjured items devraient dégrader en qualité deux fois plus vite", () => {
        const items = [new ConjuredItem("Conjured Mana Cake", 3, 6)];
        const gildedRose = new GildedRose(items);
        const result = gildedRose.updateQuality();
        console.log("Résultat pour Conjured:", result[0]);
        expect(result[0].quality).toBe(4); // à ajuster selon vos règles métier
    });

    it("Event items (Backstage passes) devraient avoir une qualité variable", () => {
        const items = [new EventItem("Backstage passes to a TAFKAL80ETC concert", 5, 20)];
        const gildedRose = new GildedRose(items);
        const result = gildedRose.updateQuality();
        console.log("Résultat pour EventItem:", result[0]);
        expect(result[0].quality).toBe(23); // à ajuster selon vos règles métier
    });

    it("Normal items devraient dégrader en qualité", () => {
        const items = [new NormalItem("Samuel", 5, 20)];
        const gildedRose = new GildedRose(items);
        const result = gildedRose.updateQuality();
        console.log("Résultat pour NormalItem:", result[0]);
        expect(result[0].quality).toBe(19); // à ajuster selon vos règles métier
    });
});
