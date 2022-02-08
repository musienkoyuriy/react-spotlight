import React, { useCallback, useMemo, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Select, { SingleValue } from 'react-select';
import { NPMS_BASE_URL } from '../../constants/api-data';
import { categoryOptions, SearchCategory } from '../../constants/search-categories';
import { CategoryOption, NpmOption } from '../../shared/interfaces/category';
import useEventListener from '../../hooks/useEventListener';
import { SpotlightCustomOption } from '../SpotlightOption';
import { customStyles } from './styles';


interface SelectState {
    selectedValue: string;
    categoriesLayout: boolean;
    selectedCategory?: SearchCategory;
    npmPageSize: number;
}

function Spotlight({ onEscape }) {
    const [selectState, setSelectState] = useState<SelectState>({
        selectedValue: '',
        categoriesLayout: true,
        selectedCategory: SearchCategory.None,
        npmPageSize: 25
    });

    const onKeyUpHandler = (e: any) => {
        if (e.key === 'Escape') {
            if (!selectState.categoriesLayout) {
                setSelectState(selectState => ({
                    ...selectState,
                    categoriesLayout: true
                }));
            } else {
                onEscape();
            }
        }
    };

    useEventListener('keyup', onKeyUpHandler)

    const handleInputChange = useCallback((newValue: string) => {
        setSelectState(selectState => {
            return {
                ...selectState,
                selectedValue: newValue
            }
        })
        console.log(selectState)
    }, []);

    const onCategoryChange = (option: SingleValue<CategoryOption>) => {
        setSelectState(selectState => ({
            ...selectState,
            categoriesLayout: false,
            selectedCategory: option?.value,
        }));
    }

    const loadOptions = useCallback((newValue: string, callback: (options: NpmOption[]) => void) => {
        if (newValue.trim() === '') {
            return;
        }

        fetch(`${NPMS_BASE_URL}?q=${newValue}&size=${selectState.npmPageSize}`)
            .then(res => res.json())
            .then(res => callback(mapRecordsToSelectList(res.results)))
    }, [selectState.npmPageSize]);

    const onSelectPackage = (option: SingleValue<any>) => {
        window.open(option?.npmLink, '_blank');
    };

    const mapRecordsToSelectList = (records): NpmOption[] => {
        return records?.map(record => {
            return {
                name: record.package.name,
                author: record.package.publisher.username,
                npmLink: record.package.links.npm,
                version: record.package.version
            }
        });
    };

    const getPlaceholder = useMemo(() => {
        return selectState.selectedCategory === SearchCategory.npm ?
            'Type to search an NPM package...' :
            'Type to search a github repository...';
    }, [selectState.selectedCategory]);

    const handleScrollToBottom = useCallback((e: WheelEvent | TouchEvent) => {
        e.preventDefault();

        setSelectState(selectState => ({
            ...selectState,
            npmPageSize: selectState.npmPageSize + 10,
        }));
    }, [setSelectState]);

    return (
        <>
            {
                selectState.categoriesLayout ?
                    <Select options={categoryOptions}
                        onChange={onCategoryChange}
                        menuIsOpen={true}
                        styles={customStyles}
                        autoFocus={true} /> :
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        placeholder={getPlaceholder}
                        loadOptions={loadOptions}
                        onInputChange={handleInputChange}
                        onMenuScrollToBottom={handleScrollToBottom}
                        onChange={onSelectPackage}
                        styles={customStyles}
                        components={{ Option: SpotlightCustomOption }}
                        autoFocus={true} />
            }
        </>
    );
}

export default Spotlight;