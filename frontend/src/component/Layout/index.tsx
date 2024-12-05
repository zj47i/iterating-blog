import AppHeader from "./AppHeader/AppHeader";
import AppFooter from "./AppFooter/AppFooter";
import AppMain from "./AppMain/AppMain";

function Layout() {
    return (
        <div className="app-layout">
            <div className="app-layout-header">
                <AppHeader />
            </div>
            <div className="app-layout-main">
                <AppMain />
            </div>
            <div className="app-layout-footer">
                <AppFooter />
            </div>
        </div>
    );
}

export default Layout;
