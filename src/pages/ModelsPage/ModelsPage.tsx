import './ModelsPage.scss';
import {useTheme, createAppTheme} from "../../theme/theme.ts";
import {useEffect, useState} from "react";
import {StlViewer} from "react-stl-viewer";
import {Loader} from "../../components/Loader/Loader.tsx";

export const ModelsPage = () => {
    const {theme: currentTheme} = useTheme();
    const muiTheme = createAppTheme(currentTheme);
    const [modelUrls, setModelUrls] = useState<string[]>([]);
    const [numberOfLoadedModels, setNumberOfLoadedModels] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadModels = () => {
            const models = import.meta.glob('/src/assets/stl/*.stl');
            const urls: string[] = [];

            for (const path in models) {
                // Vite will handle the URL creation for the assets
                const url = new URL(path, import.meta.url).href;
                urls.push(url);
            }

            setModelUrls(urls);
        };

        loadModels();
    }, []);

    useEffect(() => {
        setIsLoading(numberOfLoadedModels < modelUrls.length);
    }, [modelUrls, numberOfLoadedModels]);

    return (
        <>
            {
                <Loader type={"square"}
                        text={"Loading models"}
                        isLoading={isLoading}
                />
            }
            <h1>3d Models</h1>
            <div className="models-wrapper">
                {modelUrls.map((modelUrl, index) => (
                    <StlViewer
                        style={{
                            width: "calc(100% / 3)",
                            height: "400px"
                        }}
                        onFinishLoading={() => {
                            setNumberOfLoadedModels(prev => prev + 1);
                        }}
                        orbitControls
                        shadows
                        url={modelUrl}
                        key={index}
                        modelProps={{
                            scale: 2,
                            positionX: 50,
                            positionY: 0,
                            color: muiTheme.palette.secondary.main
                        }}
                    />
                ))}
            </div>
        </>
    );
}