// =============================================================================
// GUAMA-EVITA MVP - App.js COMPLETO CON EXPLICACIONES
// Este archivo contiene toda la aplicación web del portal
// =============================================================================

import React, { useState, useEffect } from 'react';
// ↑ Importamos React y sus hooks para manejar estado y efectos

// Importamos componentes de Material-UI para la interface
import {
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent,
  Button, TextField, Box, Alert, CircularProgress, Avatar, Paper,
  List, ListItem, ListItemIcon, ListItemText, Chip, LinearProgress
} from '@mui/material';

// Importamos iconos de Material-UI
import {
  School, Nature, TrendingUp, People, Dashboard, ExitToApp,
  LocationOn, CheckCircle, Schedule, TrendingDown
} from '@mui/icons-material';

// =============================================================================
// DATOS DE SIMULACIÓN MVP
// En una versión real, estos datos vendrían de una API/base de datos
// =============================================================================

const mockData = {
  // Usuario administrador por defecto
  user: {
    name: "Administrador MVP",
    email: "admin@guama-evita.org",
    territory: "Guaviare",
    role: "Administrador"
  },
  
  // Métricas principales del sistema
  metrics: {
    activeUsers: 1,           // Usuarios activos en el sistema
    institutions: 3,          // Instituciones educativas registradas
    greenInitiatives: 3,      // Iniciativas de economía verde
    watersheds: 2,            // Microcuencas monitoreadas
    lastUpdate: new Date().toLocaleString('es-ES') // Última actualización
  },
  
  // Lista de instituciones educativas
  institutions: [
    { 
      id: 1, 
      name: "IE Rural Guaviare", 
      territory: "Guaviare", 
      status: "Activa", 
      students: 450 
    },
    { 
      id: 2, 
      name: "IE Santander Rural", 
      territory: "Santander del Sur", 
      status: "Activa", 
      students: 320 
    },
    { 
      id: 3, 
      name: "Centro Educativo Indígena", 
      territory: "Guaviare", 
      status: "Activa", 
      students: 180 
    }
  ],
  
  // Lista de iniciativas de economía verde
  initiatives: [
    { 
      id: 1, 
      name: "Huertos Escolares", 
      territory: "Guaviare", 
      status: "Implementación", 
      progress: 75 
    },
    { 
      id: 2, 
      name: "Apicultura Sostenible", 
      territory: "Santander del Sur", 
      status: "Planificación", 
      progress: 30 
    },
    { 
      id: 3, 
      name: "Ecoturismo Comunitario", 
      territory: "Guaviare", 
      status: "Operativo", 
      progress: 100 
    }
  ],
  
  // Lista de microcuencas monitoreadas
  watersheds: [
    { 
      id: 1, 
      name: "Microcuenca Río Verde", 
      territory: "Guaviare", 
      health: 85 // Porcentaje de salud del ecosistema
    },
    { 
      id: 2, 
      name: "Microcuenca El Cristal", 
      territory: "Santander del Sur", 
      health: 72 
    }
  ]
};

// =============================================================================
// COMPONENTE PRINCIPAL DE LA APLICACIÓN
// =============================================================================

function App() {
  // ===== ESTADOS (VARIABLES QUE CAMBIAN) =====
  const [user, setUser] = useState(null);              // Usuario logueado (null = no logueado)
  const [loading, setLoading] = useState(false);       // Indicador de carga
  const [loginForm, setLoginForm] = useState({         // Formulario de login
    email: '', 
    password: '' 
  });
  const [activeTab, setActiveTab] = useState('dashboard'); // Pestaña activa

  // ===== FUNCIÓN DE LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue
    setLoading(true);   // Mostrar indicador de carga
    
    // Simular delay de autenticación (como si fuera una API real)
    setTimeout(() => {
      // Verificar credenciales (en versión real sería contra base de datos)
      if (loginForm.email === 'admin@guama-evita.org' && loginForm.password === 'admin123') {
        setUser(mockData.user); // Login exitoso: establecer usuario
      } else {
        alert('Credenciales incorrectas. Usa: admin@guama-evita.org / admin123');
      }
      setLoading(false); // Ocultar indicador de carga
    }, 1000); // 1 segundo de delay simulado
  };

  // ===== FUNCIÓN DE LOGOUT =====
  const handleLogout = () => {
    setUser(null);                    // Limpiar usuario logueado
    setActiveTab('dashboard');        // Volver al dashboard
  };

  // =============================================================================
  // PANTALLA DE LOGIN (se muestra cuando user === null)
  // =============================================================================
  
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        {/* Tarjeta de login con sombra y bordes redondeados */}
        <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
          
          {/* Header del login */}
          <Box textAlign="center" mb={3}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
              🌱 {/* Emoji como logo */}
            </Avatar>
            <Typography variant="h4" gutterBottom color="primary.main" fontWeight="bold">
              GUAMA-EVITA MVP
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ecosistema Digital Educativo Rural
            </Typography>
          </Box>
          
          {/* Alert con instrucciones */}
          <Alert severity="info" sx={{ mb: 3 }}>
            🚀 <strong>Demo MVP:</strong> Usa admin@guama-evita.org / admin123
          </Alert>
          
          {/* Formulario de login */}
          <Box component="form" onSubmit={handleLogin}>
            {/* Campo de email */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              sx={{ mb: 2 }}
              required
            />
            
            {/* Campo de contraseña */}
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              sx={{ mb: 3 }}
              required
            />
            
            {/* Botón de submit */}
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              size="large"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Ingresar al Sistema'
              )}
            </Button>
          </Box>
          
          {/* Pie del login */}
          <Box mt={3} textAlign="center">
            <Typography variant="caption" color="text.secondary">
              Versión MVP 1.0.0 - Deployment Local
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  // =============================================================================
  // DASHBOARD PRINCIPAL (se muestra cuando user !== null)
  // =============================================================================
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      
      {/* ===== BARRA DE NAVEGACIÓN SUPERIOR ===== */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🌱 GUAMA-EVITA MVP - {user.territory}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.name} ({user.role})
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
        {/* Alert de estado MVP */}
        <Alert severity="success" sx={{ mb: 3 }}>
          🎉 <strong>¡MVP Funcionando!</strong> Sistema operativo con funcionalidades core implementadas
        </Alert>

        {/* ===== MÉTRICAS PRINCIPALES (4 TARJETAS) ===== */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          
          {/* Tarjeta: Usuarios Activos */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <People color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {mockData.metrics.activeUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Usuarios Activos
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta: Instituciones */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <School color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {mockData.metrics.institutions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Instituciones
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta: Iniciativas Verdes */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <TrendingUp color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {mockData.metrics.greenInitiatives}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Iniciativas Verdes
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta: Microcuencas */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Nature color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {mockData.metrics.watersheds}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Microcuencas
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ===== SECCIONES DETALLADAS ===== */}
        <Grid container spacing={3}>
          
          {/* ===== INSTITUCIONES EDUCATIVAS ===== */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🏫 Instituciones Educativas
                </Typography>
                <List>
                  {/* Mapear cada institución a un elemento de lista */}
                  {mockData.institutions.map((institution) => (
                    <ListItem key={institution.id}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={institution.name}
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              📍 {institution.territory} • 👥 {institution.students} estudiantes
                            </Typography>
                            <Chip 
                              label={institution.status} 
                              size="small" 
                              color="success" 
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* ===== INICIATIVAS DE ECONOMÍA VERDE ===== */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🌱 Iniciativas de Economía Verde
                </Typography>
                <List>
                  {/* Mapear cada iniciativa a un elemento de lista */}
                  {mockData.initiatives.map((initiative) => (
                    <ListItem key={initiative.id}>
                      <ListItemIcon>
                        <TrendingUp color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={initiative.name}
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              📍 {initiative.territory} • {initiative.status}
                            </Typography>
                            {/* Barra de progreso */}
                            <Box display="flex" alignItems="center" mt={1}>
                              <LinearProgress 
                                variant="determinate" 
                                value={initiative.progress} 
                                sx={{ flexGrow: 1, mr: 1 }}
                              />
                              <Typography variant="caption">
                                {initiative.progress}%
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* ===== MONITOREO DE MICROCUENCAS ===== */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  💧 Monitoreo de Microcuencas
                </Typography>
                <Grid container spacing={2}>
                  {/* Mapear cada microcuenca */}
                  {mockData.watersheds.map((watershed) => (
                    <Grid item xs={12} sm={6} key={watershed.id}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {watershed.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                          📍 {watershed.territory}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            Salud del ecosistema:
                          </Typography>
                          {/* Barra de progreso con color dinámico */}
                          <LinearProgress 
                            variant="determinate" 
                            value={watershed.health} 
                            sx={{ flexGrow: 1, mr: 1 }}
                            color={
                              watershed.health > 80 ? 'success' : 
                              watershed.health > 60 ? 'warning' : 'error'
                            }
                          />
                          <Typography variant="body2" fontWeight="bold">
                            {watershed.health}%
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* ===== ESTADO DEL SISTEMA ===== */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⚡ Estado del Sistema MVP
                </Typography>
                <Grid container spacing={2}>
                  
                  {/* Portal Web - ONLINE */}
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body2">Portal Web</Typography>
                      <Typography variant="caption" color="success.main">ONLINE</Typography>
                    </Box>
                  </Grid>
                  
                  {/* Base de Datos - ONLINE */}
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body2">Base de Datos</Typography>
                      <Typography variant="caption" color="success.main">ONLINE</Typography>
                    </Box>
                  </Grid>
                  
                  {/* App Móvil - PRÓXIMAMENTE */}
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <Schedule color="warning" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body2">App Móvil</Typography>
                      <Typography variant="caption" color="warning.main">PRÓXIMAMENTE</Typography>
                    </Box>
                  </Grid>
                  
                  {/* Sync Offline - PRÓXIMAMENTE */}
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <Schedule color="warning" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="body2">Sync Offline</Typography>
                      <Typography variant="caption" color="warning.main">PRÓXIMAMENTE</Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                {/* Alert con información del sistema */}
                <Alert severity="info" sx={{ mt: 2 }}>
                  📊 <strong>Última actualización:</strong> {mockData.metrics.lastUpdate} • 
                  <strong>Versión:</strong> MVP 1.0.0 • 
                  <strong>Uptime:</strong> 100%
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Exportar el componente para que pueda ser usado en index.js
export default App;