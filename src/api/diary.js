import { supabase } from "../supabaseClient";

/** 단건 조회 */
export async function getSingleDiary(ymd) {
  const { data, error } = await supabase
    .from("diary")
    .select("topic,contents")
    .eq("diary_date", ymd)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

/** 등록/수정 */
export async function updateDiary(ymd, topic, contents) {
  const { data, error } = await supabase
    .from("diary")
    .upsert(
      {
        diary_date: ymd,
        topic: topic,
        contents: contents,
        modify_date: new Date().toISOString(),
      },
      { onConflict: "diary_date" },
    );

  if (error) {
    console.error(error);
    return 0;
  }

  return 1;
}
