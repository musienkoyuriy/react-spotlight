import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Spotlight from '../Spotlight';
import useEventListener from '../../hooks/useEventListener';
import { Container } from '../../styles';

const Title = styled.div`
    color: white;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
`;

const SpotlightContainer = () => {
    const [isActive, setIsActive] = useState(false)

    const onKeyPressHandler = useCallback((e: any) => {
        e.preventDefault();

        if (e.ctrlKey && e.key === 'f') {
            setIsActive(isActive => !isActive);
        }
    }, [setIsActive]);

    useEventListener('keyup', onKeyPressHandler);

    const onEscapeHandler = useCallback(() => {
        setIsActive(false);
    }, []);

    return (
        <Container>
            {
                isActive ?
                    <Spotlight onEscape={onEscapeHandler} /> :
                    <Title>
                        <p>Press Ctrl+F to trigger the spotlight</p>
                    </Title>
            }
        </Container>
    );
}

export default SpotlightContainer;