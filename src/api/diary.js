import { supabase } from "../supabaseClient";

/** 단건 조회 */
export async function selectSingleDiary(ymd) {
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

/** 다건 조회 */
export async function selectMultiDiaries(){
  const {data, error} = await supabase
    .from("diary")
    .select("topic, diary_date, contents")
    .order('diary_date', {ascending: false})
    .limit(10);

  if(error){
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

/** 삭제 */
export async function deleteDiary(ymd){
  const {data, error} = await supabase
    .from("diary")
    .delete()
    .eq("diary_date", ymd);
  if(error){
    console.error(error);
    return 0;
  }

  return 1;
}
