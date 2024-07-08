import styles from "./search.module.css";
import { useEffect, useState } from "react";
import SettingLightSVG from "@/public/settings-light.svg";
import Image from "next/image";
import { CARDS } from "@/source/heros";
import { Hero, getRarityNumber } from "@/source/hero/hero";
import { Rarity } from "@/source/hero/hero-types";

interface SearchProps {
  cards: Hero[];
  setCards: (cards: Hero[]) => void;
}

type SearchOptions = {
  order: string;
  stats: string | null;
  rarity: string[];
  race: string[];
};

const STATS_OPTIONS = [
  { title: "Attack Speed", value: "attackSpeed" },
  { title: "Physical Damage", value: "physicalDamage" },
  { title: "Magic Damage", value: "magicDamage" },
  { title: "Armor", value: "armor" },
  { title: "Magic Resist", value: "magicResist" },
  { title: "Health", value: "health" },
  { title: "Evasion", value: "evasion" },
];

const RARITY_OPTIONS = [
  { title: "Common", value: "common", color: "#66a4ac" },
  { title: "Improved", value: "improved", color: "#0071ff" },
  { title: "Rare", value: "rare", color: "#db8a00" },
  { title: "Epic", value: "epic", color: "#8200c3" },
  { title: "Legendary", value: "legendary", color: "#ffed00" },
  { title: "Wild", value: "wild", color: "#ff0000" },
  { title: "Mad", value: "mad", color: "#1cff00" },
];

const RACE_OPTIONS = [
  { title: "Human", value: "human" },
  { title: "Elf", value: "elf" },
  { title: "Demon", value: "demon" },
  { title: "Titan", value: "titan" },
  { title: "Half Breed", value: "halfBreed" },
  { title: "Night Elf", value: "nightElf" },
  { title: "Blood Elf", value: "bloodElf" },
  { title: "Angel", value: "angel" },
];

const ORDER_OPTIONS = [
  { title: "Max to Min", value: "maxToMin" },
  { title: "Min to Max", value: "minToMax" },
];

export const Search = ({ setCards }: SearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    order: "maxToMin",
    stats: null,
    rarity: [],
    race: [],
  });

  const searchHandler = () => {
    let newCards = [...CARDS];
    if (searchString !== "") {
      const lowerSearchString = searchString.toLocaleLowerCase();
      newCards = newCards.filter((card) => {
        for (let value of Object.values(card))
          if (String(value).toLocaleLowerCase().includes(lowerSearchString))
            return true;
        return false;
      });
    }
    if (searchOptions.rarity.length > 0) {
      newCards = newCards.filter((card) =>
        searchOptions.rarity.includes(card.rarity)
      );
    }
    if (searchOptions.race.length > 0) {
      newCards = newCards.filter((card) =>
        searchOptions.race.includes(card.race)
      );
    }
    if (searchOptions.order !== "minToMax") {
      newCards = newCards.sort(
        (a, b) =>
          getRarityNumber(b.rarity as Rarity) -
          getRarityNumber(a.rarity as Rarity)
      );
    } else {
      newCards = newCards.sort(
        (a, b) =>
          getRarityNumber(a.rarity as Rarity) -
          getRarityNumber(b.rarity as Rarity)
      );
    }
    if (searchOptions.stats === null) {
      setCards(newCards);
      return;
    }
    const stat = searchOptions.stats;
    if (searchOptions.order !== "minToMax") {
      newCards = newCards.sort((a, b) => b.stats[stat] - a.stats[stat]);
    } else {
      newCards = newCards.sort((a, b) => a.stats[stat] - b.stats[stat]);
    }
    setCards(newCards);
    return;
  };

  useEffect(() => {
    searchHandler();
  }, [searchOptions, searchString]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <input
          className={styles.searchInput}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search..."
        />
        <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
          <Image
            src={SettingLightSVG}
            width={30}
            height={30}
            alt="open/close"
          />
        </button>
      </div>
      {isOpen && (
        <div className={styles.content}>
          <div className={styles.optionsWrap}>
            <h3 className={styles.label}>Stats</h3>
            <div className={styles.line} />
            {STATS_OPTIONS.map((option) => (
              <SearchOption
                key={option.title}
                title={option.title}
                isActive={searchOptions.stats === option.value}
                onClick={() =>
                  setSearchOptions({
                    ...searchOptions,
                    stats:
                      searchOptions.stats === option.value
                        ? null
                        : option.value,
                  })
                }
              />
            ))}
          </div>
          <div className={styles.optionsWrap}>
            <h3 className={styles.label}>Rarity</h3>
            <div className={styles.line} />
            {RARITY_OPTIONS.map((option) => (
              <SearchOption
                key={option.title}
                title={option.title}
                isActive={searchOptions.rarity.includes(option.value)}
                onClick={() => {
                  const newRarity = searchOptions.rarity.includes(option.value)
                    ? [...searchOptions.rarity].filter(
                        (o) => o !== option.value
                      )
                    : [...searchOptions.rarity, option.value];
                  setSearchOptions({ ...searchOptions, rarity: newRarity });
                }}
                color={option.color}
              />
            ))}
          </div>
          <div className={styles.optionsWrap}>
            <h3 className={styles.label}>Race</h3>
            <div className={styles.line} />
            {RACE_OPTIONS.map((option) => (
              <SearchOption
                key={option.title}
                title={option.title}
                isActive={searchOptions.race.includes(option.value)}
                onClick={() => {
                  const newRace = searchOptions.race.includes(option.value)
                    ? [...searchOptions.race].filter((o) => o !== option.value)
                    : [...searchOptions.race, option.value];
                  setSearchOptions({ ...searchOptions, race: newRace });
                }}
              />
            ))}
          </div>
          <div className={styles.optionsWrap}>
            <h3 className={styles.label}>Order</h3>
            <div className={styles.line} />
            {ORDER_OPTIONS.map((option) => (
              <SearchOption
                key={option.title}
                title={option.title}
                isActive={searchOptions.order === option.value}
                onClick={() =>
                  setSearchOptions({ ...searchOptions, order: option.value })
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface SearchOptionProps {
  title: string;
  onClick: () => void;
  isActive: boolean;
  color?: string | null;
}

const SearchOption = ({
  title,
  onClick,
  isActive,
  color = null,
}: SearchOptionProps) => {
  return (
    <button
      className={
        isActive
          ? `${styles.searchOption} ${styles.active}`
          : styles.searchOption
      }
      onClick={onClick}
    >
      {color && (
        <div className={styles.color} style={{ backgroundColor: color }} />
      )}
      {title}
    </button>
  );
};
