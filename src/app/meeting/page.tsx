"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  Video, 
  MonitorUp, 
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Users,
  CircleStop,
  Radio,
  ShieldCheck,
  ArrowRight,
  User as UserIcon,
  Mail,
  Share2,
  Copy,
  CheckCircle2,
  Camera
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from "@/components/ui/card"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function MeetingPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [hasJoined, setHasJoined] = React.useState(false)
  const [participantName, setParticipantName] = React.useState("")
  const [participantEmail, setParticipantEmail] = React.useState("")
  const [agreedToTerms, setAgreedToTerms] = React.useState(false)
  
  const [isMuted, setIsMuted] = React.useState(false)
  const [isVideoOn, setIsVideoOn] = React.useState(true)
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null)
  const [isRecording, setIsRecording] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)
  
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const lobbyVideoRef = React.useRef<HTMLVideoElement>(null)
  const streamRef = React.useRef<MediaStream | null>(null)

  const defaultMeetingImg = PlaceHolderImages.find(img => img.id === 'corporate-meeting')?.imageUrl || "https://picsum.photos/seed/corp-meet/1200/800"

  React.useEffect(() => {
    if (hasJoined) return;

    const startLobbyPreview = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);
        if (lobbyVideoRef.current) {
          lobbyVideoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (error) {
        console.error('Lobby Camera Error:', error);
        setHasCameraPermission(false);
      }
    };

    startLobbyPreview();

    return () => {
      if (!hasJoined && streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [hasJoined]);

  React.useEffect(() => {
    if (!hasJoined) return;

    const startMeetingVideo = async () => {
      try {
        if (!streamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          streamRef.current = stream;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }
      } catch (error) {
        setHasCameraPermission(false);
      }
    };

    if (isVideoOn) {
      startMeetingVideo();
    } else {
      if (videoRef.current) videoRef.current.srcObject = null;
    }
  }, [hasJoined, isVideoOn]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Consentimento Necessário",
        description: "Você precisa confirmar que está ciente dos termos de gravação.",
      })
      return
    }
    if (participantName.trim() && participantEmail.trim()) {
      setHasJoined(true)
      toast({
        title: "Acesso Autorizado",
        description: `Bem-vindo ao node de conferência, ${participantName}.`,
      })
    }
  }

  const handleCopyInvite = () => {
    if (typeof window !== 'undefined') {
      const inviteLink = window.location.href;
      navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      toast({ title: "Convite Copiado" });
      setTimeout(() => setIsCopied(false), 2000);
    }
  }

  if (!hasJoined) {
    return (
      <div className="h-[calc(100vh-64px)] bg-[#0f172a] flex items-center justify-center p-6 md:p-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <Image src={defaultMeetingImg} alt="Background" fill className="object-cover grayscale" />
        </div>

        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="relative aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center group">
              {hasCameraPermission ? (
                <video ref={lobbyVideoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-slate-500">
                  <Camera className="w-16 h-16 opacity-20" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Hardware em Standby</p>
                </div>
              )}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className={cn("h-10 w-10 rounded-xl", isMuted ? "bg-destructive/20 text-destructive" : "text-white")} onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button size="icon" variant="ghost" className={cn("h-10 w-10 rounded-xl", !isVideoOn ? "bg-destructive/20 text-destructive" : "text-white")} onClick={() => setIsVideoOn(!isVideoOn)}>
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <Card className="bg-white rounded-[32px] border-none shadow-2xl p-4 md:p-8">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-black text-primary uppercase tracking-tighter">XMOV Meet Node</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                Identificação Obrigatória de Operador
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleJoin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">Nome Completo</Label>
                  <Input 
                    placeholder="Identificação do Operador" 
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-primary text-xs font-bold uppercase"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">E-mail Corporativo</Label>
                  <Input 
                    type="email" 
                    placeholder="e-mail@empresa.com" 
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus-visible:ring-primary text-xs font-bold"
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <Checkbox 
                  id="consent" 
                  checked={agreedToTerms} 
                  onCheckedChange={(v) => setAgreedToTerms(v as boolean)}
                />
                <label htmlFor="consent" className="text-[10px] font-bold text-slate-500 leading-tight cursor-pointer uppercase">
                  Confirmo ciência de que esta sessão será <span className="text-primary font-black">gravada e processada</span> pela Rubia IA para fins de governança IntegraLife.
                </label>
              </div>

              <Button 
                type="submit" 
                disabled={!agreedToTerms || !participantName || !participantEmail}
                className={cn(
                  "w-full h-16 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-2xl",
                  agreedToTerms ? "bg-primary text-white hover:bg-primary/90" : "bg-slate-200 text-slate-400"
                )}
              >
                Participar da Reunião
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-[#0f172a] flex flex-col relative overflow-hidden font-body animate-in fade-in duration-700">
      <div className="flex-1 p-6 flex items-center justify-center relative">
        <div className="w-full max-w-6xl aspect-video bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl border border-white/5 relative group">
          {isVideoOn && hasCameraPermission ? (
            <video ref={videoRef} autoPlay muted={isMuted} playsInline className="w-full h-full object-cover scale-x-[-1]" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-primary/20 text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/20">
                <UserIcon className="w-12 h-12" />
              </div>
              <Badge className="bg-white/10 text-white border-none text-[10px] font-black uppercase px-4 h-6">Câmera Desligada</Badge>
            </div>
          )}

          <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
             <span className="text-xs font-black text-white uppercase tracking-widest">{participantName}</span>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-3xl p-3 rounded-3xl border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button size="icon" variant="ghost" className={cn("h-14 w-14 rounded-2xl", isMuted ? "bg-destructive/20 text-destructive" : "text-white")} onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <Button size="icon" variant="ghost" className={cn("h-14 w-14 rounded-2xl", !isVideoOn ? "bg-destructive/20 text-destructive" : "text-white")} onClick={() => setIsVideoOn(!isVideoOn)}>
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            
            <div className="w-px h-10 bg-white/10 mx-2" />
            
            <Button size="icon" variant="ghost" className={cn("h-14 w-14 rounded-2xl text-white", isRecording && "text-destructive animate-pulse")} onClick={() => setIsRecording(!isRecording)}>
              {isRecording ? <CircleStop className="w-5 h-5" /> : <Radio className="w-5 h-5" />}
            </Button>
            <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl text-white">
              <MonitorUp className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl text-white">
              <Users className="w-5 h-5" />
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl text-white">
                  <Share2 className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-3xl border-none p-8">
                <DialogHeader>
                  <DialogTitle className="text-sm font-black uppercase text-primary tracking-widest flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-accent" />
                    Compartilhar Node XMOV
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-3 mt-6">
                  <Input readOnly value={typeof window !== 'undefined' ? window.location.href : ''} className="h-12 rounded-xl bg-slate-50 border-slate-100 font-mono text-[10px]" />
                  <Button onClick={handleCopyInvite} size="icon" className={cn("h-12 w-12 rounded-xl", isCopied ? "bg-emerald-500" : "bg-primary")}>
                    {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="w-px h-10 bg-white/10 mx-2" />

            <Button variant="destructive" className="h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest gap-3 shadow-xl shadow-destructive/20" onClick={() => router.push('/dashboard')}>
              <PhoneOff className="w-4 h-4" /> Sair
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}