export async function voteBaseHandler(record: string, type: string, body: { user: string, record_id: string }) {
    const res = await fetch(`/api/upvotes/${body.record_id}?record=${record}&type=${type}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            user: body.user
        })
    });
    const data = await res.json();
    return data;
}