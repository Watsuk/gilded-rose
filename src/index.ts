export abstract class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  abstract updateQuality(): void;
}

export class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.quality > 0) {
      this.quality -= Math.max(this.quality - 2, 0);
    }
  }
}

export class AgedBrieItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.quality < 50) {
      this.quality++;
    }
  }
}

export class EventItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.quality < 50) {
      if (this.sellIn <= 0) {
        this.quality = 0;
      } else if (this.sellIn <= 5) {
        this.quality += Math.max(this.quality + 3, 50);
      } else if (this.sellIn <= 10) {
        this.quality += Math.max(this.quality + 2, 50);
      } else {
        this.quality++;
      }
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      item.updateQuality();
      this.decrementSellIn(item);
    }
    return this.items;
  }

  private decrementSellIn(item: Item) {
    if (item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.sellIn--;
    }
  }
}