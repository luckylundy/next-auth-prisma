import "../styles/globals.css";
import { useRef } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

//クエリとキャッシュを管理するためQueryClientを新規作成
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //QueryClientの参照を保持するためにuseRefを利用
  const queryClientRef = useRef<QueryClient>();
  //queryClientRefに値がなければ新規作成したQueryClientを参照する値に上書きする
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
