import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentSession } from './utils/auth';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BranchesPage from './components/BranchesPage';
import DevelopmentServicesPage from './components/branches/DevelopmentServicesPage';
import LearningKnowledgePage from './components/branches/LearningKnowledgePage';
import WellbeingHealthPage from './components/branches/WellbeingHealthPage';
import PeaceOrderPage from './components/branches/PeaceOrderPage';
import SovereigntyBelongingPage from './components/branches/SovereigntyBelongingPage';
import CreationExchangePage from './components/branches/CreationExchangePage';
import LivelihoodProsperityPage from './components/branches/LivelihoodProsperityPage';
import LawsPage from './components/LawsPage';
import InformationPage from './components/InformationPage';
import NewsPage from './components/NewsPage';
import AccountPage from './components/AccountPage';
import LoginPage from './components/LoginPage';
import ServicesPage from './components/ServicesPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const session = getCurrentSession();
    setIsLoggedIn(!!session);
  }, []);

  // Handle page rendering
  const renderPageContent = useCallback(() => {
    const pages: Record<string, JSX.Element> = {
      home: <HomePage setCurrentPage={setCurrentPage} />,
      info: <InformationPage setCurrentPage={setCurrentPage} />,
      services: <ServicesPage />,
      laws: <LawsPage />,
      news: <NewsPage />,
      branches: <BranchesPage setCurrentPage={setCurrentPage} />,
      'development-services': <DevelopmentServicesPage setCurrentPage={setCurrentPage} />,
      'learning-knowledge': <LearningKnowledgePage setCurrentPage={setCurrentPage} />,
      'wellbeing-health': <WellbeingHealthPage setCurrentPage={setCurrentPage} />,
      'peace-order': <PeaceOrderPage setCurrentPage={setCurrentPage} />,
      'sovereignty-belonging': <SovereigntyBelongingPage setCurrentPage={setCurrentPage} />,
      'creation-exchange': <CreationExchangePage setCurrentPage={setCurrentPage} />,
      'livelihood-prosperity': <LivelihoodProsperityPage setCurrentPage={setCurrentPage} />,
      account: isLoggedIn ? <AccountPage /> : <LoginPage setIsLoggedIn={setIsLoggedIn} setCurrentPage={setCurrentPage} />
    };

    return pages[currentPage] || <HomePage setCurrentPage={setCurrentPage} />;
  }, [currentPage, isLoggedIn]);

  // Handle login page separately
  if (currentPage === 'login') {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {renderPageContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;