// Type for Payload CMS Media
export interface Media {
  id: string;
  alt?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    [key: string]: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Type for Cliente (owner)
export interface Cliente {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export interface Propiedade {
  id: string;
  title?: string | null;
  /**
   * Estado actual de la propiedad. "Terminada" se establece automáticamente al crear un contrato.
   */
  status: "borrador" | "activa" | "reservada" | "terminada";
  classification: {
    type:
      | "casa"
      | "departamento"
      | "lote"
      | "bodega"
      | "bodega_con_vinedo"
      | "cabaña"
      | "campo"
      | "chalet"
      | "cochera"
      | "condominio"
      | "deposito"
      | "duplex"
      | "edificio"
      | "estacion_de_servicio"
      | "fábrica"
      | "finca"
      | "fondo_de_comercio"
      | "fraccionamiento"
      | "galpon"
      | "hotel"
      | "industria"
      | "local_comercial"
      | "loft"
      | "loteo"
      | "negocio"
      | "oficina"
      | "ph"
      | "piso"
      | "playa_de_estacionamiento"
      | "quinta"
      | "semipiso"
      | "terreno"
      | "triplex"
      | "vinedo";
    condition: "venta" | "alquiler" | "alquiler_temporario" | "permuta";
  };
  ubication: {
    /**
     * Provincia fija: Mendoza
     */
    province?: string | null;
    department:
      | "capital"
      | "godoy_cruz"
      | "guaymallen"
      | "las_heras"
      | "lujan_de_cuyo"
      | "maipu"
      | "san_martin"
      | "rivadavia"
      | "junin"
      | "san_rafael"
      | "general_alvear"
      | "malargue"
      | "tupungato"
      | "tunuyan"
      | "san_carlos"
      | "lavalle"
      | "santa_rosa"
      | "la_paz";
    /**
     * Selecciona la localidad según el departamento elegido
     */
    locality?:
      | (
          | "1a_seccion_parque_central"
          | "2a_seccion_barrio_civico"
          | "3a_seccion_parque_ohiggins"
          | "4a_seccion_area_fundacional"
          | "5a_seccion_residencial_sur"
          | "6a_seccion_residencial_norte"
          | "7a_seccion_residencial_parque"
          | "8a_seccion_aeroparque"
          | "9a_seccion_parque_general_san_martin"
          | "10a_seccion_residencial_los_cerros"
          | "11a_seccion_san_agustin"
          | "12a_seccion_piedemonte"
          | "godoy_cruz_city"
          | "gobernador_benegas"
          | "las_tortugas"
          | "presidente_sarmiento"
          | "san_francisco_del_monte_gc"
          | "trapiche"
          | "villa_marini"
          | "villa_hipodromo"
          | "villa_del_parque"
          | "guaymallen_villa_nueva"
          | "villa_nueva"
          | "la_primavera"
          | "los_corralitos"
          | "puente_de_hierro"
          | "el_bermejo"
          | "buena_nueva"
          | "capilla_del_rosario"
          | "colonia_segovia"
          | "colonia_molina"
          | "dorrego"
          | "el_sauce"
          | "jesus_nazareno"
          | "kilometro_8"
          | "kilometro_11"
          | "las_canas"
          | "nueva_ciudad"
          | "pedro_molina"
          | "rodeo_de_la_cruz"
          | "san_francisco_del_monte_gm"
          | "san_jose_gm"
          | "belgrano_gm"
          | "blanco_encalada"
          | "jocoli_lh"
          | "el_algarrobal"
          | "el_borbollon"
          | "el_challao"
          | "el_pastal"
          | "el_plumerillo"
          | "el_resguardo"
          | "la_cieneguita"
          | "las_cuevas"
          | "las_heras_city"
          | "los_penitentes"
          | "panquehua"
          | "polvaredas"
          | "puente_del_inca"
          | "punta_de_vacas"
          | "uspallata"
          | "agrelo"
          | "barrio_perdriel_iv"
          | "carrodilla"
          | "cacheuta"
          | "chacras_de_coria"
          | "costa_flores"
          | "el_carrizal"
          | "el_salto"
          | "mayor_drummond"
          | "la_puntilla"
          | "las_compuertas"
          | "las_vegas"
          | "lujan_de_cuyo_city"
          | "perdriel"
          | "potrerillos"
          | "vistalba"
          | "ugarteche"
          | "vertientes_del_pedemonte"
          | "barrancas"
          | "barrio_jesus_de_nazaret"
          | "coquimbito"
          | "cruz_de_piedra"
          | "el_pedregal"
          | "fray_luis_beltran"
          | "general_gutierrez"
          | "general_ortega"
          | "maipu_city"
          | "lunlunta"
          | "luzuriaga"
          | "rodeo_del_medio"
          | "russell"
          | "san_roque"
          | "villa_teresa"
          | "alto_verde_sm"
          | "barrio_emanuel"
          | "barrio_la_estacion"
          | "barrio_los_charabones"
          | "barrio_nuestra_senora_de_fatima"
          | "chapanay"
          | "chivilcoy"
          | "el_espino"
          | "el_central"
          | "el_divisadero"
          | "el_ramblon"
          | "montecaseros"
          | "nueva_california_est_moluches"
          | "palmira"
          | "san_martin_city"
          | "tres_portenas"
          | "andrade"
          | "barrio_cooperativa_los_campamentos"
          | "barrio_rivadavia"
          | "el_mirador"
          | "la_central"
          | "la_esperanza"
          | "la_florida"
          | "la_libertad"
          | "los_arboles"
          | "los_campamentos"
          | "medrano_riv"
          | "mundo_nuevo_riv"
          | "reduccion_de_abajo"
          | "rivadavia_city"
          | "santa_maria_de_oro"
          | "junin_centro"
          | "los_barriales"
          | "philipps"
          | "medrano_jun"
          | "algarrobo_grande"
          | "la_colonia"
          | "alto_verde_jun"
          | "rodriguez_pena"
          | "inge_giagnoni"
          | "25_de_mayo_villa_veinticinco_de_mayo"
          | "barrio_campos_el_toledano"
          | "barrio_el_nevado"
          | "barrio_empleados_de_comercio"
          | "barrio_intendencia"
          | "capitan_montoya"
          | "cuadro_benegas"
          | "el_nihuil"
          | "el_sosneado_sr"
          | "el_tropezon"
          | "goudge"
          | "jaime_prats_sr"
          | "la_llave_nueva"
          | "las_malvinas"
          | "los_reyunos"
          | "monte_coman"
          | "pobre_diablo"
          | "punta_del_agua"
          | "rama_caida"
          | "real_del_padre"
          | "salto_de_las_rosas"
          | "san_rafael_city"
          | "villa_atuel"
          | "general_alvear"
          | "bowen"
          | "carmensa"
          | "san_pedro_del_atuel"
          | "colonia_alvear_oeste"
          | "los_compartos"
          | "agua_escondida"
          | "las_lenas"
          | "rio_grande"
          | "malargue_city"
          | "anchoris"
          | "barrio_belgrano_norte"
          | "cordon_del_plata"
          | "el_peral"
          | "el_zampal"
          | "la_arboleda"
          | "san_jose_tup"
          | "tupungato_city"
          | "villa_bastias"
          | "barrio_san_cayetano"
          | "campo_los_andes"
          | "colonia_las_rosas"
          | "el_manzano"
          | "los_sauces"
          | "tunuyan_city"
          | "vista_flores"
          | "barrio_carrasco"
          | "barrio_el_cepillo"
          | "chilecito"
          | "eugenio_bustos"
          | "la_consulta"
          | "pareditas_sc"
          | "san_carlos_city"
          | "3_de_mayo"
          | "barrio_alto_del_olvido"
          | "barrio_jocoli_ii"
          | "barrio_lagunas_de_bartoluzzi"
          | "barrio_la_palmera"
          | "barrio_la_pega"
          | "barrio_los_jarilleros"
          | "barrio_los_olivos"
          | "barrio_virgen_del_rosario"
          | "costa_de_araujo"
          | "el_paramillo"
          | "el_vergel"
          | "ingeniero_gustavo_andre"
          | "jocoli_lav"
          | "jocoli_viejo"
          | "las_violetas"
          | "villa_tulumaya"
          | "barrio_12_de_octubre"
          | "barrio_maria_auxiliadora"
          | "barrio_molina_cabrera"
          | "la_dormida"
          | "las_catitas"
          | "santa_rosa_city"
          | "desaguadero"
          | "la_paz_city"
          | "villa_antigua"
        )
      | null;
    /**
     * Nombre específico del barrio, edificio o complejo
     */
    neighborhood?: string | null;
    /**
     * Dirección completa de la propiedad
     */
    address: string;
    /**
     * Busca la dirección específica en el mapa o haz clic para marcar la ubicación exacta.
     */
    mapLocation?:
      | {
          [k: string]: unknown;
        }
      | unknown[]
      | string
      | number
      | boolean
      | null;
    /**
     * Controla qué tan precisa será la ubicación mostrada en el sitio web
     */
    locationPrivacy?: ("exact" | "approximate" | "hidden") | null;
    /**
     * Distancia en metros para el área aproximada de la ubicación
     */
    approximateRadius?: number | null;
  };
  caracteristics: {
    /**
     * Precio de la propiedad
     */
    price: number;
    currency: "usd" | "ars";
    hasExpenses?: ("Si" | "No") | null;
    expenses?: number | null;
    expensesCurrency?: ("usd" | "ars") | null;
    appraisal?: number | null;
    appraisalCurrency?: ("usd" | "ars") | null;
    coveredArea?: number | null;
    totalArea?: number | null;
    /**
     * Este campo es importante para la calidad de Mercado Libre
     */
    landArea?: number | null;
    pricePerSquareMeterArs?: number | null;
    pricePerSquareMeterUsd?: number | null;
    orientation?: ("norte" | "sur" | "este" | "oeste") | null;
    frontMeters?: number | null;
    deepMeters?: number | null;
    antiquity?:
      | (
          | "a_estrenar"
          | "6_meses"
          | "1_ano"
          | "1_ano_y_medio"
          | "2_anos"
          | "3_anos"
          | "4_anos"
          | "5_anos"
          | "6_anos"
          | "7_anos"
          | "8_anos"
          | "9_anos"
          | "10_anos"
          | "11_anos"
          | "12_anos"
          | "13_anos"
          | "14_anos"
          | "15_anos"
          | "16_anos"
          | "17_anos"
          | "18_anos"
          | "19_anos"
          | "20_anos"
          | "21_anos"
          | "22_anos"
          | "23_anos"
          | "24_anos"
          | "25_anos"
          | "26_anos"
          | "27_anos"
          | "28_anos"
          | "29_anos"
          | "30_anos"
          | "31_anos"
          | "32_anos"
          | "33_anos"
          | "34_anos"
          | "35_anos"
          | "36_anos"
          | "37_anos"
          | "38_anos"
          | "39_anos"
          | "40_anos"
          | "41_anos"
          | "42_anos"
          | "43_anos"
          | "44_anos"
          | "45_anos"
          | "46_anos"
          | "47_anos"
          | "48_anos"
          | "49_anos"
          | "50_anos"
          | "mas_de_50_anos"
        )
      | null;
    conservationStatus?:
      | ("excelente" | "muy_bueno" | "bueno" | "regular")
      | null;
  };
  environments?: {
    bedrooms?: number | null;
    bathrooms?: number | null;
    garageType?:
      | (
          | "garage"
          | "garage_cochera"
          | "garage_doble"
          | "cochera_pasante"
          | "sin_cochera"
        )
      | null;
    /**
     * Este campo es importanten para mercado libre
     */
    garages?: number | null;
    plantas?: number | null;
    ambientes?: number | null;
    furnished?: ("si" | "no") | null;
  };
  amenities?: {
    mascotas?: ("Si" | "No") | null;
    barrioPrivado?: ("si" | "no" | "semi_privado") | null;
    agua?: ("Si" | "No") | null;
    cloacas?: ("Si" | "No") | null;
    gas?: ("Si" | "No") | null;
    luz?: ("Si" | "No") | null;
    estrellas?: number | null;
    /**
     * Primero debes seleccionar el tipo de propiedad y condición
     */
    servicios?:
      | (
          | "aire_acondicionado"
          | "servicio_de_desayuno"
          | "servicio_de_limpieza"
          | "financiacion"
          | "internet"
          | "piscina"
          | "apto_credito_hipotecario"
          | "cable_tv"
          | "telefono"
          | "calefaccion_central"
          | "gas"
          | "agua"
          | "luz_electrica"
          | "recibe_permuta"
          | "caldera"
          | "cisterna"
          | "energia_solar"
          | "conexion_para_lavarropas"
          | "alarma"
          | "seguridad"
        )[]
      | null;
    ambientes?:
      | (
          | "parrilla"
          | "balcon"
          | "patio"
          | "desayunador"
          | "cocina"
          | "dormitorio_en_suite"
          | "escritorio"
          | "estudio"
          | "comedor"
          | "living"
          | "living_comedor"
          | "cowork"
          | "gimnasio"
          | "ascensor"
          | "club_house"
          | "quincho"
          | "area_de_cine"
          | "area_de_juegos_infantiles"
          | "area_verde"
          | "chimenea"
          | "dependencia_de_servicio"
          | "estacionamiento_para_visitantes"
          | "porton_automatico"
          | "rampa_para_silla_de_ruedas"
          | "salon_de_usos_multiples"
          | "sauna"
          | "terraza"
          | "jacuzzi"
          | "vestidor"
          | "toilette"
          | "placards"
          | "cancha_de_padel"
          | "cancha_de_tenis"
          | "cancha_de_basquet"
          | "cancha_de_futbol"
          | "cancha_polideportiva"
        )[]
      | null;
    zonasCercanas?:
      | (
          | "colegios"
          | "universidades"
          | "guarderias"
          | "hospitales"
          | "centros_de_salud"
          | "centro_comercial"
          | "shopping"
          | "supermercados"
          | "club_deportivo"
          | "zona_deportiva"
          | "ciclovia"
          | "paradas_de_colectivo"
          | "estacion_de_tren"
          | "estacion_de_subte"
          | "parque"
          | "plaza"
        )[]
      | null;
  };
  extra?: {
    /**
     * Este campo solo sera visible para mercado libre
     */
    bauleras?: number | null;
    /**
     * Este campo no sera visible pero es importante para la calidad de mercado libre
     */
    numeroCasa?: string | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    pisoDepartamento?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    acceso?: ("Tierra" | "Arena" | "Asfalto" | "Otro" | "Ripio") | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    guests?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    minimumStay?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    camas?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    checkinTime?:
      | (
          | "00:00"
          | "01:00"
          | "02:00"
          | "03:00"
          | "04:00"
          | "05:00"
          | "06:00"
          | "07:00"
          | "08:00"
          | "09:00"
          | "10:00"
          | "11:00"
          | "12:00"
          | "13:00"
          | "14:00"
          | "15:00"
          | "16:00"
          | "17:00"
          | "18:00"
          | "19:00"
          | "20:00"
          | "21:00"
          | "22:00"
          | "23:00"
        )
      | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    checkoutTime?:
      | (
          | "00:00"
          | "01:00"
          | "02:00"
          | "03:00"
          | "04:00"
          | "05:00"
          | "06:00"
          | "07:00"
          | "08:00"
          | "09:00"
          | "10:00"
          | "11:00"
          | "12:00"
          | "13:00"
          | "14:00"
          | "15:00"
          | "16:00"
          | "17:00"
          | "18:00"
          | "19:00"
          | "20:00"
          | "21:00"
          | "22:00"
          | "23:00"
        )
      | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    pisosEdificio?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    departamentosPorPiso?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    superficieBalcon?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    disposicion?: ("contrafrente" | "frente" | "interno" | "lateral") | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    disposicionTerreno?:
      | ("otro" | "perimetral" | "a_rio" | "a_laguna" | "interno")
      | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    formaTerreno?: ("regular" | "irregular" | "plano") | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    tipoCampo?:
      | (
          | "otro"
          | "fruticola"
          | "agricola"
          | "chacra"
          | "criadero"
          | "tambero"
          | "floricultura"
          | "forestal"
          | "ganadero"
          | "haras"
        )
      | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    accesoCochera?:
      | ("rampa_fija" | "rampa_movil" | "ascensor" | "horizontal")
      | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    tipoCochera?: ("fija" | "movil") | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    tipoCoverturaCochera?:
      | ("semi_cubierta" | "cubierta" | "descubierta")
      | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    alturaDeposito?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    banosPiso?: number | null;
    /**
     * Este campo solo sera visible para mercado libre
     */
    cantidadOficinas?: number | null;
  };
  /**
   * Genera automáticamente el título y descripción usando IA, o edítalos manualmente.
   */
  aiContent: {
    /**
     * Puedes generar automáticamente o escribir tu propio título
     */
    title: string;
    /**
     * Descripción detallada que aparecerá en el sitio web
     */
    description?: string | null;
  };
  images: {
    imagenesExtra?:
      | {
          url?: string | null;
          orden?: number | null;
          id?: string | null;
        }[]
      | null;
    /**
     * Imagen principal que aparecerá como portada. No repetir esta imagen en la galería.
     */
    coverImage: string | Media;
    /**
     * Arrastrá varias imágenes a la vez; podés reordenarlas con drag & drop.
     */
    gallery?: (string | Media)[] | null;
    /**
     * Enlace a un video de la propiedad (YouTube, Vimeo, etc.). Se mostrará un botón en la ficha.
     */
    videoUrl?: string | null;
    /**
     * Enlace a un tour virtual 3D (ej: Matterport). Se mostrará un botón en la ficha.
     */
    virtualTourUrl?: string | null;
  };
  owner: string | Cliente;
  /**
   * Notas o comentarios internos sobre la propiedad (no se muestran en el sitio)
   */
  notes?: string | null;
  inmoup?: {
    name?: string | null;
    uploaded?: boolean | null;
    externalId?: string | null;
    externalUrl?: string | null;
    status?: ("not_sent" | "queued" | "ok" | "error" | "desactualizado") | null;
    lastSyncAt?: string | null;
    lastError?: string | null;
  };
  mercadolibre?: {
    name?: string | null;
    uploaded?: boolean | null;
    externalId?: string | null;
    externalUrl?: string | null;
    status?: ("not_sent" | "queued" | "ok" | "error" | "desactualizado") | null;
    lastSyncAt?: string | null;
    lastError?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
