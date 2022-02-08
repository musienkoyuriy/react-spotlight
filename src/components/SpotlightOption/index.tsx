import styled from 'styled-components'

const Option = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    transition: all .3s;
    background: ${props => props.isFocused ? "#ccc" : "none"};
    :hover {
        background: #ccc;
    }
    .version {
        color: grey;
    }
`;

export const SpotlightCustomOption = ({ innerProps, isFocused, data }) => {
    const { author, name, version } = data;
    // debugger
    return <Option {...innerProps} isFocused={isFocused}>
        <div>{name} - {author}</div>
        <div className="version">{version}</div>
    </Option>
};
