import { Rss, Share2, Heart, MessageSquare, MoreHorizontal, Megaphone } from 'lucide-react';

export default function StudentFeed() {
  const posts = [
    { user: 'Tech Club', avatar: 'https://picsum.photos/seed/tech/100/100', content: 'Excited to announce the annual Hackathon! Registration starts tomorrow at 10 AM. 🚀 #VidyoraHack', likes: 124, comments: 18, time: '2h ago' },
    { user: 'Elena (ME)', avatar: 'https://picsum.photos/seed/elena/100/100', content: 'Does anyone have the notes for Thermodynamics Lecture 12? I missed it due to the clinic appointment.', likes: 8, comments: 24, time: '3h ago' },
    { user: 'Campus Life', avatar: 'https://picsum.photos/seed/campus/100/100', content: 'New menu items at the North Canteen are awesome! Highly recommend the paneer wrap. 🌯', likes: 210, comments: 42, time: '5h ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
          <h2 className="text-3xl font-black font-headline tracking-tighter mb-2">Campus Feed</h2>
          <p className="text-[#94a3b8] text-sm font-medium">Connect with your peers and stay updated with campus life.</p>
      </section>

      {/* Official Announcement Card */}
      <div className="bg-gradient-to-br from-[#0a66c2]/80 to-[#4da3ff]/80 p-6 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden group">
         <Megaphone className="absolute -right-2 -bottom-2 opacity-10 rotate-12 group-hover:scale-110 transition-transform" size={100} />
         <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-3">
             <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
             Official Announcement
         </div>
         <h3 className="text-lg font-bold text-white leading-tight">Holiday Notice: Autumn break starts from Oct 28th.</h3>
         <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold text-white transition-all">Read Full Circular</button>
      </div>

      {/* Feed List */}
      <div className="space-y-6 pb-20">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-[#171b27] rounded-3xl p-6 border border-white/5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                    <div>
                        <h4 className="text-sm font-bold">{post.user}</h4>
                        <p className="text-[10px] text-[#8b919e] font-bold uppercase tracking-widest">{post.time}</p>
                    </div>
                </div>
                <MoreHorizontal size={18} className="text-[#8b919e]" />
            </div>
            <p className="text-sm text-[#dfe2f2]/90 leading-relaxed">{post.content}</p>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1.5 text-xs text-[#8b919e] hover:text-red-400 transition-colors">
                        <Heart size={16} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-[#8b919e] hover:text-blue-400 transition-colors">
                        <MessageSquare size={16} /> {post.comments}
                    </button>
                </div>
                <Share2 size={16} className="text-[#8b919e] cursor-pointer hover:text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
