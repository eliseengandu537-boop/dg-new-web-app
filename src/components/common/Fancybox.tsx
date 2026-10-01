"use client"
import { useRef, useEffect, type PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import type { OptionsType } from '@fancyapps/ui/types/Fancybox/options';

interface Props {
   options?: Partial<OptionsType>;
   delegate?: string;
}

const DEFAULT_OPTIONS: Partial<OptionsType> = {};

const Fancybox = ({ children, delegate = '[data-fancybox]', options = DEFAULT_OPTIONS }: PropsWithChildren<Props>) => {
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      NativeFancybox.bind(container, delegate, {
         // Gallery navigation must not change the Next.js route or hide its controls.
         Hash: false,
         idle: false,
         ...options,
      });

      return () => {
         NativeFancybox.unbind(container);
      };
   }, [delegate, options]);

   useEffect(() => {
      const container = containerRef.current;

      return () => {
         // Only close this wrapper's viewer when it actually unmounts. Rebinding
         // options or removing another listing must leave the active gallery open.
         const instance = NativeFancybox.getInstance();
         const trigger = instance?.options.triggerEl;
         if (instance && trigger && container?.contains(trigger)) {
            instance.close();
         }
      };
   }, []);

   return <div ref={containerRef}>{children}</div>;
}

export default Fancybox
