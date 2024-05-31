import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { mock } from "bun:test";

GlobalRegistrator.register();

mock.module("next/navigation", () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: mock(),
      replace: mock(),
      prefetch: mock(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  };
});
