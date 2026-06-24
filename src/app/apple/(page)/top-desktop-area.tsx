import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default function TopDesktopArea() {
  return (
    <section className="w-full h-12 border-b border-gray-700 relative flex items-center justify-end">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/apple/ln" });
        }}
      >
        <Button className="tracking-wider mr-6 cursor-pointer">
          登出
        </Button>
      </form>
    </section>
  );
}
