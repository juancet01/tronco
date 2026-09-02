import { StyleSheet } from 'react-native';

// ============================================
// ESTILOS GLOBALES
// ============================================

// HOME SCREEN STYLES
export const homeStyles = StyleSheet.create({
  fondoGeneral: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },

  tituloGrande: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginTop: 15,
  },

  tituloMediano: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },

  tituloSeccion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 10,
    marginTop: 5,
  },

  filaHorizontal: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  botonPasajero: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D6DCE8',
    marginRight: 8,
  },

  botonPasajeroSeleccionado: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },

  textoBotonPasajero: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
  },

  textoBotonPasajeroSeleccionado: {
    color: '#FFFFFF',
  },

  botonFalso: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginRight: 10,
  },

  tarjetaSimple: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  textoRuta: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },

  textoAerolinea: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748b',
  },

  badge: {
    backgroundColor: '#eef2ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  badgeText: {
    color: '#2563eb',
    fontSize: 11,
    fontWeight: '700',
  },

  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  horaGrande: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },

  textoChico: {
    fontSize: 12,
    color: '#94a3b8',
  },

  textoDuracion: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },

  durationBox: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  filaPrecioBoton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 15,
  },

  textoPrecio: {
    fontSize: 12,
    color: '#94a3b8',
  },

  textoPrecioNegrita: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },

  botonAzul: {
    backgroundColor: '#2D6AFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
  },

  botonRojo: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
  },

  textoBotonBlanco: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  espaciadorFinal: {
    height: 20,
  },
});

// SEARCH SCREEN STYLES
export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  topSection: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748b',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  input: {
    height: 56,
    backgroundColor: '#fff',
    borderColor: '#dbe2ff',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f172a',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  route: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
  },
  airline: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748b',
  },
  badge: {
    backgroundColor: '#eef2ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#2563eb',
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  durationBox: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  duration: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  emptyText: {
    marginTop: 6,
    color: '#64748b',
  },
});

// PROFILE SCREEN STYLES
export const profileStyles = StyleSheet.create({
  fondoGeneral: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },

  tarjetaPerfil: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },

  circuloFoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  letraFoto: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2D6AFF',
  },

  nombreUsuario: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },

  correoUsuario: {
    fontSize: 15,
    color: '#666666',
    marginTop: 4,
  },

  tarjetaEstadisticas: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },

  itemEstadistica: {
    alignItems: 'center',
  },

  numeroEstadistica: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D6AFF',
  },

  textoEstadistica: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },

  tarjetaOpciones: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginBottom: 15,
  },

  filaOpcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  textoOpcion: {
    fontSize: 16,
    color: '#1A1A2E',
  },

  textoValor: {
    fontSize: 16,
    color: '#888888',
  },
});

// SETTINGS SCREEN STYLES
export const settingsStyles = StyleSheet.create({
  fondoGeneral: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },

  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 5,
  },

  tarjetaBlanca: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginBottom: 10,
  },

  filaOpcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  textoOpcion: {
    fontSize: 16,
    color: '#1A1A2E',
  },

  textoEstado: {
    fontSize: 15,
    color: '#888888',
  },

  botonCerrarSesion: {
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  textoCerrarSesion: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  botonPasajero: {
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 18,
  paddingVertical: 10,
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#DDDDDD',
  marginRight: 10,
},
botonPasajeroSeleccionado: {
  backgroundColor: '#2D6AFF',
  borderColor: '#2D6AFF',
},
textoBotonPasajero: {
  color: '#333333',
  fontSize: 14,
},
textoBotonPasajeroSeleccionado: {
  color: '#FFFFFF',
  fontWeight: 'bold',
},
});



