import { ResultFile } from '../../../types/file'

export default function getFile(): [string[], ResultFile] {
    return [['src'], {
        name: 'routes',
        ext: 'ts',
        content: `
        import { lazy } from 'ice';

        const Home = lazy(() => import('@/pages/Home'));

        const routerConfig = [
            {
                path: '/',
                component: Home
            },
        ];

        export default routerConfig;

        `
    }]
}
