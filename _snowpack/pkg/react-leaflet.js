import { l as leafletSrc } from './common/leaflet-src-c0a374f6.js';
import { r as react } from './common/index-c277be94.js';
import './common/index-61588a8d.js';
import './common/_commonjsHelpers-eb5a497e.js';

function useAttribution(map, attribution) {
  const attributionRef = react.useRef(attribution);
  react.useEffect(function updateAttribution() {
    if (attribution !== attributionRef.current && map.attributionControl != null) {
      if (attributionRef.current != null) {
        map.attributionControl.removeAttribution(attributionRef.current);
      }

      if (attribution != null) {
        map.attributionControl.addAttribution(attribution);
      }
    }

    attributionRef.current = attribution;
  }, [map, attribution]);
}

function updateCircle(layer, props, prevProps) {
  if (props.center !== prevProps.center) {
    layer.setLatLng(props.center);
  }

  if (props.radius != null && props.radius !== prevProps.radius) {
    layer.setRadius(props.radius);
  }
}

const CONTEXT_VERSION = 1;
const LeafletContext = /*#__PURE__*/react.createContext(null);
const LeafletProvider = LeafletContext.Provider;
function useLeafletContext() {
  const context = react.useContext(LeafletContext);

  if (context == null) {
    throw new Error('No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>');
  }

  return context;
}

function createContainerComponent(useElement) {
  function ContainerComponent(props, ref) {
    const {
      instance,
      context
    } = useElement(props).current;
    react.useImperativeHandle(ref, () => instance);
    return props.children == null ? null : /*#__PURE__*/react.createElement(LeafletProvider, {
      value: context
    }, props.children);
  }

  return /*#__PURE__*/react.forwardRef(ContainerComponent);
}
function createLeafComponent(useElement) {
  function LeafComponent(props, ref) {
    const {
      instance
    } = useElement(props).current;
    react.useImperativeHandle(ref, () => instance);
    return null;
  }

  return /*#__PURE__*/react.forwardRef(LeafComponent);
}

function useEventHandlers(element, eventHandlers) {
  const eventHandlersRef = react.useRef();
  react.useEffect(function addEventHandlers() {
    if (eventHandlers != null) {
      element.instance.on(eventHandlers);
    }

    eventHandlersRef.current = eventHandlers;
    return function removeEventHandlers() {
      if (eventHandlersRef.current != null) {
        element.instance.off(eventHandlersRef.current);
      }

      eventHandlersRef.current = null;
    };
  }, [element, eventHandlers]);
}

function withPane(props, context) {
  const pane = props.pane ?? context.pane;
  return pane ? { ...props,
    pane
  } : props;
}

function createElementHook(createElement, updateElement) {
  if (updateElement == null) {
    return function useImmutableLeafletElement(props, context) {
      return react.useRef(createElement(props, context));
    };
  }

  return function useMutableLeafletElement(props, context) {
    const elementRef = react.useRef(createElement(props, context));
    const propsRef = react.useRef(props);
    const {
      instance
    } = elementRef.current;
    react.useEffect(function updateElementProps() {
      if (propsRef.current !== props) {
        updateElement(instance, props, propsRef.current);
        propsRef.current = props;
      }
    }, [instance, props, context]);
    return elementRef;
  };
}

function useLayerLifecycle(element, context) {
  react.useEffect(function addLayer() {
    const container = context.layerContainer ?? context.map;
    container.addLayer(element.instance);
    return function removeLayer() {
      var _context$layersContro;

      (_context$layersContro = context.layersControl) == null ? void 0 : _context$layersContro.removeLayer(element.instance);
      context.map.removeLayer(element.instance);
    };
  }, [context, element]);
}
function createLayerHook(useElement) {
  return function useLayer(props) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useAttribution(context.map, props.attribution);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLayerLifecycle(elementRef.current, context);
    return elementRef;
  };
}

function usePathOptions(element, props) {
  const optionsRef = react.useRef();
  react.useEffect(function updatePathOptions() {
    if (props.pathOptions !== optionsRef.current) {
      const options = props.pathOptions ?? {};
      element.instance.setStyle(options);
      optionsRef.current = options;
    }
  }, [element, props]);
}
function createPathHook(useElement) {
  return function usePath(props) {
    const context = useLeafletContext();
    const elementRef = useElement(withPane(props, context), context);
    useEventHandlers(elementRef.current, props.eventHandlers);
    useLayerLifecycle(elementRef.current, context);
    usePathOptions(elementRef.current, props);
    return elementRef;
  };
}

function createLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createContainerComponent(useLayer);
}
function createPathComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const usePath = createPathHook(useElement);
  return createContainerComponent(usePath);
}
function createTileLayerComponent(createElement, updateElement) {
  const useElement = createElementHook(createElement, updateElement);
  const useLayer = createLayerHook(useElement);
  return createLeafComponent(useLayer);
}

function updateGridLayer(layer, props, prevProps) {
  const {
    opacity,
    zIndex
  } = props;

  if (opacity != null && opacity !== prevProps.opacity) {
    layer.setOpacity(opacity);
  }

  if (zIndex != null && zIndex !== prevProps.zIndex) {
    layer.setZIndex(zIndex);
  }
}

function useMap() {
  return useLeafletContext().map;
}
function useMapEvents(handlers) {
  const map = useMap();
  react.useEffect(function addMapEventHandlers() {
    map.on(handlers);
    return function removeMapEventHandlers() {
      map.off(handlers);
    };
  }, [map, handlers]);
  return map;
}

const Circle = createPathComponent(function createCircle({
  center,
  children: _c,
  ...options
}, ctx) {
  const instance = new leafletSrc.Circle(center, options);
  return {
    instance,
    context: { ...ctx,
      overlayContainer: instance
    }
  };
}, updateCircle);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function useMapElement(mapRef, props) {
  const [map, setMap] = react.useState(null);
  react.useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new leafletSrc.Map(mapRef.current, props);

      if (props.center != null && props.zoom != null) {
        instance.setView(props.center, props.zoom);
      } else if (props.bounds != null) {
        instance.fitBounds(props.bounds, props.boundsOptions);
      }

      if (props.whenReady != null) {
        instance.whenReady(props.whenReady);
      }

      setMap(instance);
    }
  }, [mapRef, map, props]);
  return map;
}
function MapContainer({
  children,
  className,
  id,
  placeholder,
  style,
  whenCreated,
  ...options
}) {
  const mapRef = react.useRef(null);
  const map = useMapElement(mapRef, options);
  const createdRef = react.useRef(false);
  react.useEffect(() => {
    if (map != null && createdRef.current === false && whenCreated != null) {
      createdRef.current = true;
      whenCreated(map);
    }
  }, [map, whenCreated]);
  const [props] = react.useState({
    className,
    id,
    style
  });
  const context = react.useMemo(() => map ? {
    __version: CONTEXT_VERSION,
    map
  } : null, [map]);
  const contents = context ? /*#__PURE__*/react.createElement(LeafletProvider, {
    value: context
  }, children) : placeholder ?? null;
  return /*#__PURE__*/react.createElement("div", _extends({}, props, {
    ref: mapRef
  }), contents);
}

const Marker = createLayerComponent(function createMarker({
  position,
  ...options
}, ctx) {
  const instance = new leafletSrc.Marker(position, options);
  return {
    instance,
    context: { ...ctx,
      overlayContainer: instance
    }
  };
}, function updateMarker(marker, props, prevProps) {
  if (props.position !== prevProps.position) {
    marker.setLatLng(props.position);
  }

  if (props.icon != null && props.icon !== prevProps.icon) {
    marker.setIcon(props.icon);
  }

  if (props.zIndexOffset != null && props.zIndexOffset !== prevProps.zIndexOffset) {
    marker.setZIndexOffset(props.zIndexOffset);
  }

  if (props.opacity != null && props.opacity !== prevProps.opacity) {
    marker.setOpacity(props.opacity);
  }

  if (marker.dragging != null && props.draggable !== prevProps.draggable) {
    if (props.draggable === true) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }
});

const TileLayer = createTileLayerComponent(function createTileLayer({
  url,
  ...options
}, context) {
  return {
    instance: new leafletSrc.TileLayer(url, withPane(options, context)),
    context
  };
}, updateGridLayer);

export { Circle, MapContainer, Marker, TileLayer, useMapEvents };
