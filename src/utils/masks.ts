export const handleCPFMask = (cpf: string) => {
    const unmaskedCPF = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    const maskedCPF = unmaskedCPF
      .slice(0, 11) // Limita o tamanho do CPF em 11 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Insere o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Insere o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere o traço

    return maskedCPF;
};


export const handlePhoneMask = (phone: string) => {
    const maskedPhone = phone
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .slice(0, 11) // Limita o tamanho do número de telefone em 11 dígitos
      .replace(/(\d{2})(\d)/, '($1) $2') // Insere o parêntese após os dois primeiros dígitos
      .replace(/(\d{5})(\d)/, '$1-$2'); // Insere o hífen
    return maskedPhone;
};


export const handleCEPMask = (cep: string) => {
    const maskedCEP = cep
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .slice(0, 8) // Limita o tamanho do CEP em 8 dígitos
      .split('')
      .map((char, index) => (index === 5 ? `-${char}` : char))
      .join('');
    return maskedCEP;
};

export const handleNumberMask = (number: string) => {
    const maskedNumber = number.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    return maskedNumber;
  };