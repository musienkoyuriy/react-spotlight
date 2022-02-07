import { useCallback, useState } from 'react';
import Spotlight from '../Spotlight';
import useEventListener from '../../hooks/useEventListener';
import { Container } from '../../styles';

const SpotlightContainer = () => {
    const [isActive, setIsActive] = useState(false)

    const onKeyPressHandler = useCallback((e: any) => {
        e.preventDefault();

        if (e.ctrlKey && e.key === 'f') {
            setIsActive(!isActive);
        }
    }, [isActive, setIsActive])
    useEventListener('keyup', onKeyPressHandler)

    const content = isActive ? <Spotlight /> : <div>no spotlight</div>

    return (
        <Container>{content}</Container>
    );
}

export default SpotlightContainer;