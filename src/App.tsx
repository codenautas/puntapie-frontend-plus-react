import { Route, Outlet} from 'react-router-dom';
import {App as AppFromFrontendPlusReact} from 'frontend-plus-react';

// Tus nuevos componentes y páginas personalizadas
const MyNewHomePage = () => <div>¡Mi página de inicio personalizada!</div>;
const MyCustomRoutePage = () => <div>Esta es una página de ruta personalizada.</div>;
const AboutPage = () => <div>Acerca de nosotros.</div>;
const ContactPage = () => <div>Página de Contacto.</div>;

const SimplePublicLayout = () => (
  <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
    <nav style={{ padding: 10, background: 'white' }}>Logo Público | <a href="/login">Login</a></nav>
    <div style={{ padding: 20 }}>
      <Outlet /> {/* <--- Aquí se renderiza AboutPage, ContactPage, etc. */}
    </div>
    <footer>Pie de página público</footer>
  </div>
);

function App() {
  return (
    <AppFromFrontendPlusReact
      puenteBP
      myRoutes={
        <>
          <Route path="/about" element={<AboutPage />} />
        </>
      }
      myUnloggedRoutes={
        <>
          <Route path="/mi-nueva-home" element={<MyNewHomePage />} />
          <Route path="/mi-ruta-personalizada" element={<MyCustomRoutePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </>
      }
      unloggedLayout={SimplePublicLayout}
    />
  );
}

export default App; 