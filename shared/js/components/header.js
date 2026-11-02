const createHeader = ({ project, title }) => `
    <header class="topbar">
        <a class="topbar_back" href="/">Archive</a>
        <span class="topbar_project">${project}</span>
        <span class="topbar_title">${title}</span>
    </header>
`;
