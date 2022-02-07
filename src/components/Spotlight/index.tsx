import React, { useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { NPMS_BASE_URL } from '../../constants';
import { CategoryOption } from '../../data';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

interface NpmPackage {

}

function Spotlight() {
    const [selectedValue, setSelectedValue] = useState<string>('')
    const handleInputChange = useCallback((newValue: string) => {
        setSelectedValue(newValue)
        console.log(selectedValue)
    }, []);
    const loadOptions = (newValue: string, callback: (options: CategoryOption[]) => void) => {
        if (newValue.trim() === '') {
            return;
        }
        fetch(`${NPMS_BASE_URL}?q=${newValue}`)
            .then(res => res.json())
            .then(res => callback(mapRecordsToSelectList(res.results)))
    }
    const mapRecordsToSelectList = (records) => {
        return records?.map(record => {
            return {
                value: record.package.name,
                label: record.package.publisher.username
            }
        });
    }
    return (
        <div>
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                onInputChange={handleInputChange} />
        </div>
    )
}

export default Spotlight;