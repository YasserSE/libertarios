"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Check, MapPin, User, Calendar, Heart, Globe } from "lucide-react";
import { toast } from "sonner";

const provinces = [
  "A Coruña", "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
  "Badajoz", "Baleares", "Barcelona", "Bizkaia", "Burgos", "Cáceres", "Cádiz",
  "Cantabria", "Castellón", "Ceuta", "Ciudad Real", "Córdoba", "Cuenca",
  "Gipuzkoa", "Girona", "Granada", "Guadalajara", "Huelva", "Huesca", "Jaén",
  "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga",
  "Melilla", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra",
  "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria",
  "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Zamora", "Zaragoza"
];

const ageRanges = [
  "18-24", "25-34", "35-44", "45-54", "55-64", "65+"
];

const genders = [
  { value: "hombre", label: "Hombre" },
  { value: "mujer", label: "Mujer" },
  { value: "no-binario", label: "No binario" },
  { value: "otro", label: "Otro" },
  { value: "prefiero-no-decir", label: "Prefiero no decir" },
];

const orientations = [
  { value: "heterosexual", label: "Heterosexual" },
  { value: "homosexual", label: "Homosexual" },
  { value: "bisexual", label: "Bisexual" },
  { value: "otro", label: "Otro" },
  { value: "prefiero-no-decir", label: "Prefiero no decir" },
];

const nationalities = [
  "Española", "Argentina", "Venezolana", "Colombiana", "Mexicana", "Peruana",
  "Chilena", "Ecuatoriana", "Cubana", "Uruguaya", "Otra"
];

interface RegistrationFormProps {
  onComplete?: (data: RegistrationData) => void;
  quadrantPosition?: { economic: number; social: number } | null;
}

export interface RegistrationData {
  municipality: string;
  city: string;
  province: string;
  ageRange: string;
  gender: string;
  orientation: string;
  nationality: string;
  economic: number;
  social: number;
}

export function RegistrationForm({ onComplete, quadrantPosition }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    municipality: "",
    city: "",
    province: "",
    ageRange: "",
    gender: "",
    orientation: "",
    nationality: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!quadrantPosition) {
      toast.error("Por favor, completa el test o selecciona tu posición en el cuadrante");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const registrationData: RegistrationData = {
      ...formData,
      economic: quadrantPosition.economic,
      social: quadrantPosition.social,
    };
    
    toast.success("¡Registro completado! Gracias por participar.");
    onComplete?.(registrationData);
    setIsSubmitting(false);
  };

  const isStep1Valid = formData.province && formData.city;
  const isStep2Valid = formData.ageRange && formData.gender;
  const isStep3Valid = formData.nationality;

  const steps = [
    { icon: MapPin, label: "Ubicación" },
    { icon: User, label: "Demografía" },
    { icon: Globe, label: "Nacionalidad" },
    { icon: Check, label: "Confirmar" },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
      {/* Progress steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step > index + 1
                  ? "bg-primary text-primary-foreground"
                  : step === index + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > index + 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                <s.icon className="w-5 h-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 transition-all ${
                  step > index + 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Location */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              ¿Dónde resides?
            </h3>
            <p className="text-sm text-muted-foreground">
              Esta información se muestra de forma agregada en el mapa
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="province">Provincia *</Label>
              <Select
                value={formData.province}
                onValueChange={(value) => setFormData({ ...formData, province: value })}
              >
                <SelectTrigger className="mt-1 bg-background">
                  <SelectValue placeholder="Selecciona tu provincia" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="city">Ciudad *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ej: Sevilla, Bilbao, Valencia..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="municipality">Municipio (opcional)</Label>
              <Input
                id="municipality"
                value={formData.municipality}
                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                placeholder="Si aplica"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            variant="cta"
            className="w-full"
            onClick={() => setStep(2)}
            disabled={!isStep1Valid}
          >
            Continuar
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Demographics */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Información demográfica
            </h3>
            <p className="text-sm text-muted-foreground">
              Datos 100% anónimos para estadísticas agregadas
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="ageRange">Rango de edad *</Label>
              <Select
                value={formData.ageRange}
                onValueChange={(value) => setFormData({ ...formData, ageRange: value })}
              >
                <SelectTrigger className="mt-1 bg-background">
                  <SelectValue placeholder="Selecciona tu rango" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  {ageRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range} años
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gender">Género *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger className="mt-1 bg-background">
                  <SelectValue placeholder="Selecciona tu género" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  {genders.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="orientation">Orientación sexual (opcional)</Label>
              <Select
                value={formData.orientation}
                onValueChange={(value) => setFormData({ ...formData, orientation: value })}
              >
                <SelectTrigger className="mt-1 bg-background">
                  <SelectValue placeholder="Prefiero no decir" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border z-50">
                  {orientations.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
              Atrás
            </Button>
            <Button
              variant="cta"
              className="flex-1"
              onClick={() => setStep(3)}
              disabled={!isStep2Valid}
            >
              Continuar
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Nationality */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nacionalidad
            </h3>
            <p className="text-sm text-muted-foreground">
              Para entender la diversidad de orígenes
            </p>
          </div>

          <div>
            <Label htmlFor="nationality">Nacionalidad *</Label>
            <Select
              value={formData.nationality}
              onValueChange={(value) => setFormData({ ...formData, nationality: value })}
            >
              <SelectTrigger className="mt-1 bg-background">
                <SelectValue placeholder="Selecciona tu nacionalidad" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                {nationalities.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
              Atrás
            </Button>
            <Button
              variant="cta"
              className="flex-1"
              onClick={() => setStep(4)}
              disabled={!isStep3Valid}
            >
              Continuar
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Confirma tu registro
            </h3>
            <p className="text-sm text-muted-foreground">
              Revisa tus datos antes de enviar
            </p>
          </div>

          <div className="bg-background border border-border rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Provincia:</span>
              <span className="font-medium text-foreground">{formData.province}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ciudad:</span>
              <span className="font-medium text-foreground">{formData.city}</span>
            </div>
            {formData.municipality && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Municipio:</span>
                <span className="font-medium text-foreground">{formData.municipality}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Edad:</span>
              <span className="font-medium text-foreground">{formData.ageRange} años</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Género:</span>
              <span className="font-medium text-foreground">
                {genders.find(g => g.value === formData.gender)?.label}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nacionalidad:</span>
              <span className="font-medium text-foreground">{formData.nationality}</span>
            </div>
            {quadrantPosition && (
              <div className="flex justify-between text-sm border-t pt-3 mt-3">
                <span className="text-muted-foreground">Posición ideológica:</span>
                <span className="font-medium text-primary">
                  E: {quadrantPosition.economic > 0 ? '+' : ''}{quadrantPosition.economic} | 
                  S: {quadrantPosition.social > 0 ? '+' : ''}{quadrantPosition.social}
                </span>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Al registrarte, aceptas que tus datos se muestren de forma anónima y agregada.
            Cumplimos con la normativa RGPD.
          </p>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
              Atrás
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={handleSubmit}
              disabled={isSubmitting || !quadrantPosition}
            >
              {isSubmitting ? "Registrando..." : "Confirmar registro"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
