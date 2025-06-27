import { Route } from 'react-router-dom';
import {App as AppFromFrontendPlusReact} from 'frontend-plus-react';

// Tus nuevos componentes y páginas personalizadas
const MyNewHomePage = () => <div>¡Mi página de inicio personalizada!</div>;
const MyCustomRoutePage = () => <div>Esta es una página de ruta personalizada.</div>;
const AboutPage = () => <div>Acerca de nosotros.</div>;
const ContactPage = () => <div>Página de Contacto.</div>;


function App() {
  return (
    <AppFromFrontendPlusReact
      myRoutes={
        <>
          <Route path="/mi-nueva-home" element={<MyNewHomePage />} />
          <Route path="/mi-ruta-personalizada" element={<MyCustomRoutePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </>
      }
    />
  );
}

export default App;