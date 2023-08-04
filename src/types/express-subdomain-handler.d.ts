declare module 'express-subdomain-handler' {
    import express from 'express';

    interface SubdomainHandlerOptions {
      base: string;
      removeWWW?: boolean;
    }

    function subdomainHandler(options: SubdomainHandlerOptions): express.RequestHandler;

    export = subdomainHandler;
  }
