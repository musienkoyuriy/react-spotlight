import { SearchCategory } from "../../constants/search-categories";

export interface CategoryOption {
    value: SearchCategory;
    label: string
}

export interface NpmOption {
    name: string;
    author: string;
    npmLink: string;
    version: string;
}