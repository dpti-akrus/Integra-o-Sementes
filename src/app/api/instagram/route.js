export const revalidate = 1800;

export async function GET() {
  try {
    const token = process.env.INSTA_TOKEN;

    if (!token) {
      return Response.json(
        {
          data: [],
          error: "INSTA_TOKEN não configurado",
        },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      fields:
        "id,media_type,media_url,thumbnail_url,permalink,timestamp,caption",
      limit: "12",
      access_token: token,
    });

    const response = await fetch(
      `https://graph.instagram.com/me/media?${params.toString()}`,
      {
        next: {
          revalidate: 1800,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Erro Instagram API:", result);

      return Response.json(
        {
          data: [],
          error:
            result?.error?.message ||
            "Erro ao buscar publicações do Instagram",
        },
        { status: response.status }
      );
    }

    return Response.json({
      data: result.data || [],
    });
  } catch (error) {
    console.error("Erro Instagram:", error);

    return Response.json(
      {
        data: [],
        error: "Erro interno ao consultar Instagram",
      },
      { status: 500 }
    );
  }
}