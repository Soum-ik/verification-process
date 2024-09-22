import { useNavigate } from 'react-router-dom';

const useGoBack = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back one page
    };

    return goBack;
};

export default useGoBack;
