export abstract class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  abstract updateQuality(): void;
}

export class ConjuredItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    this.quality = Math.max(this.quality - 2, 0);
    if (this.sellIn <= 0) {
      this.quality = Math.max(this.quality - 2, 0);
    }
  }
}

export class AgedItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    this.quality = Math.min(this.quality + 1, 50);
  }
}

export class EventItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.sellIn <= 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality = Math.min(this.quality + 3, 50);
    } else if (this.sellIn <= 10) {
      this.quality = Math.min(this.quality + 2, 50);
    } else {
      this.quality++;
    }
  }
}

export class LegendaryItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  updateQuality() { }
}

export class NormalItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    this.quality = Math.max(this.quality - 1, 0);
    if (this.sellIn <= 0) {
      this.quality = Math.max(this.quality - 1, 0);
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
    if (!(item instanceof LegendaryItem)) {
      item.sellIn--;
    }
  }
}