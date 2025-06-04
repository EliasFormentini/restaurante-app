const getAllUsers = async () => {
    // Simulação por enquanto
    return [
      { id: 1, email: 'admin@email.com', role: 'admin' },
      { id: 2, email: 'user@email.com', role: 'user' },
    ];
  };
  
  export default { getAllUsers };
  