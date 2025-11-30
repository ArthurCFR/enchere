import { Routes, Route } from 'react-router-dom';
import GroupSelection from './pages/GroupSelection';
import Workspace from './pages/Workspace';
import Admin from './pages/Admin';
import StackPresentation from './pages/StackPresentation';
import Podium from './pages/Podium';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GroupSelection />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/presentation" element={<StackPresentation />} />
      <Route path="/admin/podium" element={<Podium />} />
    </Routes>
  );
}

export default App;
