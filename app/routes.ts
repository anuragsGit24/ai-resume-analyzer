import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
    route('/upload', 'routes/upload.tsx'),
    route('/resume/:id', 'routes/resume.tsx'), //dynamic segment of route every resume is unique
    route('/builder', 'routes/builder.tsx'), // Resume builder route - handles both new and edit
    route('/wipe', 'routes/wipe.tsx'),
] satisfies RouteConfig;
