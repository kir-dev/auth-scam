export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const form = await request.formData();
  return Response.json({
    access_token: form.get("code") || "invalid",
    token_type: "bearer",
  });
}
