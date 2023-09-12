export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality, type) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            this.updateItemQuality(item);
        }
        return this.items;
    }

    private updateItemQuality(item: Item) {
        switch (item.name) {
            case 'Preserve':
                this.updateAgedBrieQuality(item);
                break;
            case 'Legendary':
                break;
            case 'Evenement':
                this.updateEvenementQuality(item);
                break;
            case 'Conjured':
                this.updateConjuredQuality(item);
                break;
            default:
                this.updateNormalItemQuality(item);
                break;
        }
        this.decrementSellIn(item);
    }

    private updateAgedBrieQuality(item: Item) {
        if (item.quality < 50) {
            item.quality++;
        }
    }

    private updateEvenementQuality(item: Item) {
        if (item.quality < 50) {
            if (item.sellIn <= 0) {
                item.quality = 0;
            } else if (item.sellIn <= 5) {
                item.quality += Math.max(item.quality + 3, 50);
            } else if (item.sellIn <= 10) {
                item.quality += Math.max(item.quality + 2, 50);
            } else {
                item.quality++;
            }
        }
    }

    private updateConjuredQuality(item: Item) {
        if (item.quality > 0) {
            item.quality -= Math.max(item.quality - 2, 0);
        }
    }

    private updateNormalItemQuality(item: Item) {
        if (item.quality > 0) {
            if (item.sellIn <= 0) {
                item.quality -= Math.max(item.quality - 2, 0);
            } else {
                item.quality--;
            }
        }
    }

    private decrementSellIn(item: Item) {
        if (item.name !== 'Sulfuras, Hand of Ragnaros') {
            item.sellIn--;
        }
    }
}